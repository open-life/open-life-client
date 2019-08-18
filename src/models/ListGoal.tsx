export class ListGoal {
    public ListGoalId: number;
    public Name: string;
    public ListName: string;
    public StartDate: Date;
    public EndDate: Date;
    public Target: number;
    public Items: ListItem[] = [];

    constructor(name: string, listName: string, start: Date, end: Date, target: number) {
        this.ListGoalId = 0;
        this.Name = name;
        this.ListName = listName;
        this.StartDate = start;
        this.EndDate = end;
        this.Target = target;
    }
}

export class ListItem {
    public ListItemId: number;
    public Name: string;
    public Progress: Progress;

    constructor(name: string) {
        this.ListItemId = 0;
        this.Name = name;
        this.Progress = Progress.InProgress;
    }
}

export enum Progress {
    Completed,
    InProgress
}