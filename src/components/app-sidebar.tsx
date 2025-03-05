import React from "react";
import { Button } from "@/components/ui/button";
import { useSidebarContext } from "@/hooks/use-sidebar";
import { GreetingForm } from "@/components/nodes/greeting";
// import { QuestionForm } from "@/components/nodes/question";
// import { InformationForm } from "@/components/nodes/information";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

export function AppSidebar() {
  const { activeForm, setActiveForm } = useSidebarContext();

  //   const formButtons = [
  //     {
  //       title: "Greeting",
  //       type: "greeting",
  //       component: GreetingForm,
  //     },
  //     {
  //       title: "Question",
  //       type: "question",
  //       component: QuestionForm,
  //     },
  //     {
  //       title: "Information",
  //       type: "information",
  //       component: InformationForm,
  //     },
  //   ];

  return (
    <div className="w-full">
      <div className="bg-white">
        <div className="p-4">
          <div className="text-lg font-semibold mb-4">Supported Nodes</div>
          <div className="space-y-4">
            <GreetingForm />
            {/* <QuestionForm />
            <InformationForm /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
