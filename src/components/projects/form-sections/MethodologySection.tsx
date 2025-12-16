
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "../types/form-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, Kanban, ListTodo, Workflow, Network } from "lucide-react";
import { Label } from "@/components/ui/label";

interface MethodologySectionProps {
  form: UseFormReturn<ProjectFormValues>;
}

const MethodologySection = ({ form }: MethodologySectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Agile Methodology</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="methodology"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Select Methodology</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4"
                >
                  <div className="rounded-lg border p-4 hover:border-primary">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scrum" id="scrum" />
                      <Label htmlFor="scrum" className="font-semibold">Scrum</Label>
                    </div>
                    <div className="flex items-center mb-3 mt-2">
                      <CalendarClock className="h-5 w-5 mr-2 text-primary" />
                      <span className="text-sm text-muted-foreground">Sprint-based approach</span>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4 hover:border-primary">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="kanban" id="kanban" />
                      <Label htmlFor="kanban" className="font-semibold">Kanban</Label>
                    </div>
                    <div className="flex items-center mb-3 mt-2">
                      <Kanban className="h-5 w-5 mr-2 text-primary" />
                      <span className="text-sm text-muted-foreground">Flow-based approach</span>
                    </div>
                  </div>
                  
 {/*                  <div className="rounded-lg border p-4 hover:border-primary">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hybrid" id="hybrid" />
                      <Label htmlFor="hybrid" className="font-semibold">Hybrid</Label>
                    </div>
                    <div className="flex items-center mb-3 mt-2">
                      <ListTodo className="h-5 w-5 mr-2 text-primary" />
                      <span className="text-sm text-muted-foreground">Combined approach</span>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4 hover:border-primary">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="waterfall" id="waterfall" />
                      <Label htmlFor="waterfall" className="font-semibold">Waterfall</Label>
                    </div>
                    <div className="flex items-center mb-3 mt-2">
                      <Workflow className="h-5 w-5 mr-2 text-primary" />
                      <span className="text-sm text-muted-foreground">Sequential approach</span>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4 hover:border-primary">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="safe" id="safe" />
                      <Label htmlFor="safe" className="font-semibold">SAFe</Label>
                    </div>
                    <div className="flex items-center mb-3 mt-2">
                      <Network className="h-5 w-5 mr-2 text-primary" />
                      <span className="text-sm text-muted-foreground">Scaled Agile Framework</span>
                    </div>
                  </div> */}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default MethodologySection;
