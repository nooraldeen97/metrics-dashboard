import React, { useEffect } from "react";
import { useDatasetContext } from "../context/useDatasetContext";
import { SkeletonCard } from "./SkeletonCard";
import { apiCall } from "../lib/api";

interface anotPropType {
  isloading: boolean;
}
function AnnotationSection({ isloading }: anotPropType) {
  const { AnnotationData, contextData, setAnnotationData } =
    useDatasetContext();

  async function handleDelete(annotID: string) {
    const deleteAnnotationResponse = await apiCall(
      `/annotations/${annotID}`,
      "DELETE",
      { dataset_id: contextData?.id }
    );
      const updatedAnnot = AnnotationData.filter((an) => an.id != annotID);
      setAnnotationData(updatedAnnot);

  }
  return (
    <div>
      <div className="border rounded-lg shadow-md p-4 m-5 h-4/5">
        <div className="flex justify-between items-center">
          <h1 className="text-sm font-semibold">ANNOTATIONS</h1>
          <button className="text-[13px] text-blue-800 cursor-pointer">
            Add
          </button>
        </div>
        <hr className="my-3" />
        {isloading ? (
          <SkeletonCard className="w-full h-16" count={3} />
        ) : (
          AnnotationData?.map((annot) => {
            return (
              <div key={annot.id}>
                <div className="p-2 rounded-lg bg-gray-100 mt-2">
                  <h1 className="font-semibold text-[12]"> {annot.text}</h1>
                  <h1 className="font-light text-[12px]">
                    {new Date(annot.timestamp * 1000).toLocaleTimeString()}
                  </h1>
                  <p
                    onClick={() => {
                      handleDelete(annot.id);
                    }}
                    className="text-right text-[12px] text-fuchsia-700 hover:text-red-500 cursor-pointer"
                  >
                    Delete
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AnnotationSection;
