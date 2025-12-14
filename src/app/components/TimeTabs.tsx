import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function TimeTabs() {
  return (
    <div>
      <Tabs defaultValue="twoHours">
        <TabsList>
          <TabsTrigger value="30min">30 min</TabsTrigger>
          <TabsTrigger value="twoHours">2 hours</TabsTrigger>
          <TabsTrigger value="24hours">24 hours</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

export default TimeTabs;
