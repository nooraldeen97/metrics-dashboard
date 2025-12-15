import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiCall } from "../lib/api";
import { useDatasetContext } from "../context/useDatasetContext";

interface AnnotationModalProps {
  isOpen: boolean;
  setIsOpen: (x: boolean) => void;
  annotationData: {
    time: string;
    name: string;
  };
}

function AnnotationModal({
  isOpen,
  setIsOpen,
  annotationData,
}: AnnotationModalProps) {
  const { contextData, setAnnotationData } = useDatasetContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const annotation = formData.get("annotation");
    const { name, time } = annotationData;
    const postAnnotation = await apiCall(`/annotations`, "POST", {
      dataset_id: contextData?.id,
      timestamp: new Date(time).getTime(),
      text: annotation,
      name,
    });
    // if (postAnnotation.status = "200") {
    setIsOpen(false);

    const metricsData = await apiCall(
      `/metrics?dataset=${contextData?.id}`,
      "GET"
    );

    setAnnotationData(metricsData.annotations);
    // }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogTitle>Add Annotation</DialogTitle>

            <div className="grid gap-4">
              <div className="grid gap-3">
                <Input
                  id="name"
                  name=""
                  disabled
                  defaultValue={annotationData.name}
                />
              </div>
              <div className="grid gap-3">
                <Input
                  id="time"
                  name=""
                  disabled
                  defaultValue={annotationData.time}
                />
              </div>
              <div className="grid gap-3">
                <Input
                  id="message"
                  name="annotation"
                  placeholder="Type here ..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="mt-2">
                Add
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AnnotationModal;
