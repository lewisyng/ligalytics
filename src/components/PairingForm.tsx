import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
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
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const PairingForm = ({
    leagues,
    onSuccess,
}: {
    leagues: any;
    onSuccess?: () => void;
}) => {
    const allTeamNames = leagues.leagues.flatMap((league: any) =>
        league.teams.map((team: any) => team.name),
    );

    const formSchema = z.object({
        teamA: z.enum(allTeamNames as [string, ...string[]]),
        teamB: z.enum(allTeamNames as [string, ...string[]]),
        startDate: z.date({
            message: "Startdatum ist erforderlich",
        }),
        endDate: z.date({
            message: "Enddatum ist erforderlich",
        }),
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
        defaultValues: {
            teamA: undefined,
            teamB: undefined,
            startDate: undefined,
            endDate: undefined,
            rule: undefined,
            commentary: "",
        },
    });

    const selectedTeamA = form.watch("teamA");
    const selectedTeamB = form.watch("teamB");

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log("Form submitted with data:", data);

        // Create pairing object with createdAt timestamp
        const pairing = {
            ...data,
            createdAt: new Date().toISOString(),
            id: Date.now(), // Simple ID generation
        };

        console.log("pairing to be saved:", pairing);

        // Get existing pairings from localStorage
        const existingPairings = localStorage.getItem("pairings");
        const pairings = existingPairings ? JSON.parse(existingPairings) : [];

        // Add new pairing
        pairings.push(pairing);

        // Save back to localStorage
        localStorage.setItem("pairings", JSON.stringify(pairings));

        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent("pairingsUpdated"));

        // Reset form
        form.reset();

        // Show success toast
        toast.success("Pairing erfolgreich gespeichert!", {
            description: `${pairing.teamA} vs ${pairing.teamB} wurde zu Ihren Pairings hinzugefügt.`,
            duration: 4000,
        });

        // Call onSuccess callback if provided (to close dialog)
        onSuccess?.();
    };

    const onError = (errors: any) => {
        console.log("Form validation errors:", errors);
        const missingFields = Object.keys(errors).join(", ");
        toast.error("Validierungsfehler", {
            description: `Bitte füllen Sie alle erforderlichen Felder aus: ${missingFields}`,
            duration: 5000,
        });
    };
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit, onError)}
                    className="space-y-6"
                >
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
                                                <SelectValue placeholder="Team A" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {allTeamNames
                                                .filter(
                                                    (teamName: string) =>
                                                        teamName !==
                                                        selectedTeamB,
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
                                                <SelectValue placeholder="Team B" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {allTeamNames
                                                .filter(
                                                    (teamName: string) =>
                                                        teamName !==
                                                        selectedTeamA,
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
                                                        format(
                                                            field.value,
                                                            "PPP",
                                                        )
                                                    ) : (
                                                        <span className="text-white">
                                                            Startdatum
                                                        </span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 text-white" />
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
                                                    date <
                                                        new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
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
                                                        format(
                                                            field.value,
                                                            "PPP",
                                                        )
                                                    ) : (
                                                        <span className="text-white">
                                                            Enddatum
                                                        </span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 text-white" />
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
                                                    date <
                                                        new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="rule"
                        render={({ field }) => (
                            <FormItem>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="text-white">
                                            <SelectValue placeholder="Regel" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="am gleichen Tag zuhause">
                                            am gleichen Tag zuhause
                                        </SelectItem>
                                        <SelectItem value="am gleichen Wochenende zuhause">
                                            am gleichen Wochenende zuhause
                                        </SelectItem>
                                        <SelectItem value="nicht am gleichen Tag zuhause">
                                            nicht am gleichen Tag zuhause
                                        </SelectItem>
                                        <SelectItem value="nicht am gleichen Wochenende zuhause">
                                            nicht am gleichen Wochenende zuhause
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="commentary"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        placeholder="Optional: Fügen Sie zusätzliche Notizen oder Kommentare zu diesem Pairing hinzu..."
                                        className="bg-transparent border-gray-300 placeholder:text-gray-400"
                                        rows={4}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Pairing speichern
                    </Button>
                </form>
            </Form>
        </div>
    );
};
