export class NumberGoal {
    public NumberGoalId: number;
    public Name: string;
    public StartDate: Date;
    public EndDate: Date;
    public Target: number;
    public Logs: NumberLog[] = [];

    constructor(name: string, start: Date, end: Date, target: number) {
        this.NumberGoalId = 0;
        this.Name = name;
        this.StartDate = start;
        this.EndDate = end;
        this.Target = target;
    }
}

export class NumberLog {
    public NumberLogId: number;
    public Date: Date;
    public Amount: number;

    constructor(date: Date, goalAmount: number) {
        this.NumberLogId = 0;
        this.Date = date;
        this.Amount = goalAmount;
    }
}