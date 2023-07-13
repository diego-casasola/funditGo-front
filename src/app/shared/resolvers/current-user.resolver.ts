import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { User } from "src/app/auth/interfaces/user.interface";
import { AuthService } from "src/app/auth/services/auth.service";

@Injectable({
    providedIn: 'root',
})
export class CurrentUserResolver implements Resolve<User | null> {
    constructor(
        private authService: AuthService,
    ) { }
    async resolve(): Promise<User | null> {
        try {
            const user = await this.authService.getUserById(this.authService.usuario.user_id).toPromise();
            console.log(user);
            if (!user) {
                throw new Error('User not found');
            }
            this.authService.setCurrentUser(user);
            return user;
        } catch (error) {
            return null;
        }
    }
}