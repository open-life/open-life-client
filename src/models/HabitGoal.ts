export class HabitGoal {
    public HabitGoalId: number;
    public Name: string;
    public StartDate: Date;
    public EndDate: Date;
    public Target: number;
    public Logs: HabitLog[] = [];

    public UserEmail: string;

    constructor(name: string, start: Date, end: Date, userEmail: string) {
        this.HabitGoalId = 0;
        this.Name = name;
        this.StartDate = start;
        this.EndDate = end;
        this.Target = this.dateDiffInDays(start, end);
        this.UserEmail = userEmail;
    }

    private _MS_PER_DAY = 1000 * 60 * 60 * 24;

    private dateDiffInDays(a: Date, b: Date) {
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / this._MS_PER_DAY);
    }
}

export class HabitLog {
    public HabitLogId: number;
    public Date: Date;
    public HabitCompleted: boolean;

    public HabitGoalId: number;

    constructor(goalId: number, date: Date, habitCompleted: boolean) {
        this.HabitGoalId = goalId;

        this.HabitLogId = 0;
        this.Date = date;
        this.HabitCompleted = habitCompleted;
    }
}

