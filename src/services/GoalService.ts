import { HabitGoal } from '../models/HabitGoal';
import GoalOverview from '../models/GoalOverview';
import { NumberGoal } from '../models/NumberGoal';
import { ListGoal } from '../models/ListGoal';
import { Observable, BehaviorSubject, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import HttpClient from './HttpClient';

export default class GoalService {
    private _httpClient: HttpClient;

    private _goalOverviews: BehaviorSubject<GoalOverview[]>;
    public GoalOverViews: Observable<GoalOverview[]>;

    private _habitGoals: BehaviorSubject<HabitGoal[]>;
    public HabitGoals: Observable<HabitGoal[]>;

    private _listGoals: BehaviorSubject<ListGoal[]>;
    public ListGoals: Observable<ListGoal[]>;

    private _numberGoals: BehaviorSubject<NumberGoal[]>;
    public NumberGoals: Observable<NumberGoal[]>;

    constructor() {
        this._httpClient = new HttpClient();

        this._goalOverviews = new BehaviorSubject([] as GoalOverview[]);
        this.GoalOverViews = this._goalOverviews.asObservable();

        this._habitGoals = new BehaviorSubject([] as HabitGoal[]);
        this.HabitGoals = this._habitGoals.asObservable();

        this._listGoals = new BehaviorSubject([] as ListGoal[]);
        this.ListGoals = this._listGoals.asObservable();

        this._numberGoals = new BehaviorSubject([] as NumberGoal[]);
        this.NumberGoals = this._numberGoals.asObservable();

        this.loadState();
    }

    private loadState(): void {
        zip(this.loadGoalOverviews(), this.loadHabitGoals(), this.loadListGoals(), this.loadNumberGoals())
            .subscribe(values => {
                this._goalOverviews.next(values[0]);
                this._habitGoals.next(values[1]);
                this._listGoals.next(values[2]);
                this._numberGoals.next(values[3]);
            });
    }

    private loadGoalOverviews(): Observable<GoalOverview[]> {
        return this.load("https://localhost:44343/api/Goals", this._goalOverviews);
    }

    private loadHabitGoals(): Observable<HabitGoal[]> {
        return this.load("https://localhost:44343/api/HabitGoal", this._habitGoals);
    }

    private loadNumberGoals(): Observable<NumberGoal[]> {
        return this.load("https://localhost:44343/api/NumberGoal", this._numberGoals);
    }

    private loadListGoals(): Observable<ListGoal[]> {
        return this.load("https://localhost:44343/api/ListGoal", this._listGoals);
    }

    private load<T>(url: string, stateSubject: BehaviorSubject<T>): Observable<T> {
        return this._httpClient.get<T>(url).pipe(
            map((response: T) => {
                stateSubject.next(response);
                return response;
            })
        );
    }

    saveHabitGoal(habitGoal: HabitGoal): Observable<HabitGoal> {
        return this.save<HabitGoal>("https://localhost:44343/api/HabitGoal", habitGoal, this._habitGoals);
    }

    saveNumberGoal(numberGoal: NumberGoal): Observable<NumberGoal> {
        return this.save<NumberGoal>("https://localhost:44343/api/NumberGoal", numberGoal, this._numberGoals);
    }

    saveListGoal(listGoal: ListGoal): Observable<ListGoal> {
        return this.save<ListGoal>("https://localhost:44343/api/ListGoal", listGoal, this._listGoals);
    }

    private save<T>(url: string, goal: T, stateSubject: BehaviorSubject<T[]>): Observable<T> {
        let goals = stateSubject.value;
        goals.push(goal);
        stateSubject.next(goals);

        return this._httpClient.post<T>(url, goal);
    }
}