export class HabitGoal {
    public HabitGoalId!: number;
    public Name!: string;
    public Target!: number;
    public Logs!: HabitLog[];
}

export class HabitLog {
    public HabitLogId!: number;
    public Date!: Date;
    public HabitCompleted!: boolean;
}