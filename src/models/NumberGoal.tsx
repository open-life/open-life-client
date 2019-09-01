export class NumberGoal {
    public NumberGoalId: number;
    public Name: string;
    public StartDate: Date;
    public EndDate: Date;
    public Target: number;
    public Logs: NumberLog[] = [];

    public UserId: number;

    constructor(name: string, start: Date, end: Date, target: number, userId: number) {
        this.NumberGoalId = 0;
        this.Name = name;
        this.StartDate = start;
        this.EndDate = end;
        this.Target = target;
        this.UserId = userId;
    }
}

export class NumberLog {
    public NumberLogId: number;
    public Date: Date;
    public Amount: number;

    public NumberGoalId: number;

    constructor(goalId: number, date: Date, goalAmount: number) {
        this.NumberGoalId = goalId;

        this.NumberLogId = 0;
        this.Date = date;
        this.Amount = goalAmount;
    }
}