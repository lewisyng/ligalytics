import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const PairingForm = ({ leagues }: { leagues: any }) => {
    const allTeamNames = leagues.leagues.flatMap((league: any) =>
        league.teams.map((team: any) => team.name),
    );

    const formSchema = z.object({
        teamA: z.enum(allTeamNames as [string, ...string[]]),
        teamB: z.enum(allTeamNames as [string, ...string[]]),
        startDate: z.date({
            message: "Start date is required",
        }),
        endDate: z.date({
            message: "End date is required",
        }),
        time: z.string().min(1, "Time is required"),
        rule: z.enum([
            "am gleichen Tag zuhause",
            "am gleichen Wochenende zuhause",
            "nicht am gleichen Tag zuhause",
            "nicht am gleichen Wochenende zuhause",
        ]),
        commentary: z.string().optional(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    const selectedTeamA = form.watch("teamA");
    const selectedTeamB = form.watch("teamB");

    return (
        <div>
            <Form {...form}>
                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="teamA"
                        render={({ field }) => (
                            <FormItem>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="text-white">
                                            <SelectValue placeholder="Select Team A" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {allTeamNames
                                            .filter(
                                                (teamName: string) =>
                                                    teamName !== selectedTeamB,
                                            )
                                            .map((teamName: string) => (
                                                <SelectItem
                                                    key={teamName}
                                                    value={teamName}
                                                >
                                                    {teamName}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="teamB"
                        render={({ field }) => (
                            <FormItem>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="text-white">
                                            <SelectValue placeholder="Select Team B" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {allTeamNames
                                            .filter(
                                                (teamName: string) =>
                                                    teamName !== selectedTeamA,
                                            )
                                            .map((teamName: string) => (
                                                <SelectItem
                                                    key={teamName}
                                                    value={teamName}
                                                >
                                                    {teamName}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-white">
                                    Start Date
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={`w-60 pl-3 text-left font-normal text-white ${
                                                    !field.value &&
                                                    "text-muted-foreground"
                                                }`}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick start date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date() ||
                                                date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription className="text-white">
                                    Select the tournament start date
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-white">
                                    End Date
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={`w-60 pl-3 text-left font-normal text-white ${
                                                    !field.value &&
                                                    "text-muted-foreground"
                                                }`}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick end date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date() ||
                                                date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription className="text-white">
                                    Select the tournament end date
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="time"
                    render={() => (
                        <FormItem>
                            <FormLabel />
                            <FormControl>{/* Your form field */}</FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="rule"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Rule</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="text-white">
                                        <SelectValue placeholder="Select a rule" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="text-white">
                                    <SelectItem
                                        value="am gleichen Tag zuhause"
                                        className="text-white"
                                    >
                                        am gleichen Tag zuhause
                                    </SelectItem>
                                    <SelectItem
                                        value="am gleichen Wochenende zuhause"
                                        className="text-white"
                                    >
                                        am gleichen Wochenende zuhause
                                    </SelectItem>
                                    <SelectItem
                                        value="nicht am gleichen Tag zuhause"
                                        className="text-white"
                                    >
                                        nicht am gleichen Tag zuhause
                                    </SelectItem>
                                    <SelectItem
                                        value="nicht am gleichen Wochenende zuhause"
                                        className="text-white"
                                    >
                                        nicht am gleichen Wochenende zuhause
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription className="text-white">
                                Choose the scheduling rule for this pairing
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="commentary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">
                                Commentary
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Add any additional notes or comments about this pairing..."
                                    className="text-white bg-transparent border-gray-300 placeholder:text-gray-400"
                                    rows={4}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="text-white">
                                Optional notes about scheduling preferences,
                                special considerations, or other relevant
                                information.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Form>
        </div>
    );
};
