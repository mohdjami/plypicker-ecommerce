"use client";

import { useState, useCallback } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import Link from "next/link";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "@/utils/crop";
import { Input } from "../ui/input";
import Image from "next/image";

export default function UploadImage({
  initial,
  onImageUpload,
}: {
  initial: string;
  onImageUpload: (url: string) => void;
}) {
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>(initial);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | Area>(null); // Update this line
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [showCropper, setShowCropper] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const url = URL.createObjectURL(file);
      setImageURL(url);
      setShowCropper(true);
    } else {
      setImage(null);
      setImageURL(initial);
      setShowCropper(true);
    }
  };

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels); // Correctly set the pixels
    },
    []
  );

  const handleCrop = async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedImageBlob: any = await getCroppedImg(
        imageURL,
        croppedAreaPixels
      );
      setCroppedImage(
        new File([croppedImageBlob], image?.name || "cropped.jpg", {
          type: "image/jpeg",
        })
      );
      setShowCropper(false);
      URL.revokeObjectURL(imageURL); // Revoke the object URL
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = () => {
    if (!croppedImage) return;
    const fileRef = ref(storage, `files/${croppedImage.name}`);
    const uploadTask = uploadBytesResumable(fileRef, croppedImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageURL(url);
          onImageUpload(url); // Notify parent component about the URL
          setShowCropper(false); // Hide cropper after uploading
        });
      }
    );
  };

  const handleDownload = () => {
    if (imageURL) {
      const link = document.createElement("a");
      link.href = imageURL;
      link.download = croppedImage?.name || "image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    //First I want to upload the image automatically
    //Then showcropper
    <div className="p-4 space-y-4">
      <input
        type="file"
        onChange={handleChange}
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm"
      />
      {showCropper && (
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-md">
            <div className="w-full h-80">
              <Cropper
                image={imageURL ? imageURL : initial}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <button
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
              onClick={handleCrop}
            >
              Crop Image
            </button>
          </div>
        </div>
      )}
      {!showCropper && (
        <div className="flex flex-col items-center space-y-4 h-[500px]">
          {" "}
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
            onClick={handleUpload}
          >
            Upload
          </button>{" "}
          {progress > 0 && (
            <div className="w-full max-w-lg">
              <progress
                className="w-full bg-gray-200 rounded-md"
                value={progress}
                max="100"
              >
                {progress}%
              </progress>
            </div>
          )}
          {(imageURL || initial) && (
            <div className="text-center flex">
              {" "}
              <Image
                src={imageURL ? imageURL : initial}
                width={500}
                height={375}
                alt="Uploaded image"
                className="mx-auto my-4 w-full max-w-xs rounded-lg shadow-lg"
              />
              <div>
                <Link href={imageURL} className="text-blue-600 hover:underline">
                  Image link
                </Link>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
                  onClick={handleDownload}
                >
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
