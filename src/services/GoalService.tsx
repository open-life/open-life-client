import { HabitGoal } from '../models/HabitGoal';
import GoalOverview from '../models/GoalOverview';
import { NumberGoal } from '../models/NumberGoal';
import { ListGoal } from '../models/ListGoal';
import { type } from 'os';

export default class GoalService {
    loadGoalOverviews(): Promise<GoalOverview[]> {
        return this.get<GoalOverview[]>("https://localhost:44343/api/Goals");
    }

    loadHabitGoals(): Promise<HabitGoal[]> {
        return this.get<HabitGoal[]>("https://localhost:44343/api/HabitGoal");
    }

    postHabitGoal(habitGoal: HabitGoal): Promise<HabitGoal> {
        return this.post<HabitGoal>("https://localhost:44343/api/HabitGoal", habitGoal);
    }

    loadNumberGoals(): Promise<NumberGoal[]> {
        return this.get<NumberGoal[]>("https://localhost:44343/api/NumberGoal");
    }

    postNumberGoal(numberGoal: NumberGoal): Promise<NumberGoal> {
        return this.post<NumberGoal>("https://localhost:44343/api/NumberGoal", numberGoal);
    }

    loadListGoals(): Promise<ListGoal[]> {
        return this.get<ListGoal[]>("https://localhost:44343/api/ListGoal");
    }

    postListGoal(listGoal: ListGoal): Promise<ListGoal> {
        return this.post<ListGoal>("https://localhost:44343/api/ListGoal", listGoal);
    }

    private get<T>(url: string): Promise<T> {
        return fetch(url, { mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } })
            .then(function (response) {
                return response.json() as Promise<T>;
            });
    }

    private post<T>(url: string, body: T): Promise<T> {
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(body),
        })
            .then(response => {
                return response.json() as Promise<T>;
            });
    }
}