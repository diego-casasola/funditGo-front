import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/user.interface';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.API_URL;

  private readonly JWT_TOKEN = 'access';
  private readonly CURRENT_USER_ID = 'usuario';

  private _usuario!: User;
  private _currentUserId!: string;
  private _currentUser!: User;

  get currentUserId() {
    return this._currentUserId;
  }

  get currentUser() {
    return this._currentUser;
  }

  get usuario() {
    return { ...this._usuario };
  }

  get accessToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  setAccessToken(access: string) {
    localStorage.setItem(this.JWT_TOKEN, access!);
  }

  isLogged() {
    return !!this.accessToken;
  }

  constructor(
    private httpCliente: HttpClient,
    private route: Router
  ) {
    if (this.accessToken) {
      const decoded = helper.decodeToken(this.accessToken);
      this._usuario = {
        user_id: decoded.UserId,
        nombre: decoded.FullName,
        username: decoded.UserName,
        is_staff: decoded.IsStaff,
        permisos: [
          decoded.Permission_CREATE_PROYECTOS && decoded.Permission_CREATE_PROYECTOS,
          decoded.Permission_CREATE_DONACIONES && decoded.Permission_CREATE_DONACIONES,
          decoded.Permission_CREATE_COMENTARIOS && decoded.Permission_CREATE_COMENTARIOS,
          decoded.Permission_ADMIN_SEC && decoded.Permission_ADMIN_SEC,
          decoded.Permission_ADMIN_PROYECTOS && decoded.Permission_ADMIN_PROYECTOS,
          decoded.Permission_ADMIN_DONACIONES && decoded.Permission_ADMIN_DONACIONES,
          decoded.Permission_ADMIN_REQUISITOS && decoded.Permission_ADMIN_REQUISITOS
        ].filter(Boolean)
      }
    }
  }

  login(username: string, password: string) {
    const url = `${this.baseUrl}/Security/login`;
    const body = {
      username,
      password
    }
    return this.httpCliente.post<AuthResponse>(url, body).pipe(
      tap((token) => {
        const decoded = helper.decodeToken(token.jwt);
        this.storeTokens(token);
        if (decoded) {
          console.log('decoded');
          console.log(decoded);
          this._usuario = {
            user_id: decoded.UserId,
            nombre: decoded.FullName,
            username: decoded.UserName,
            is_staff: decoded.IsStaff,
            permisos: [
              decoded.Permission_CREATE_PROYECTOS && decoded.Permission_CREATE_PROYECTOS,
              decoded.Permission_CREATE_DONACIONES && decoded.Permission_CREATE_DONACIONES,
              decoded.Permission_CREATE_COMENTARIOS && decoded.Permission_CREATE_COMENTARIOS,
              decoded.Permission_ADMIN_SEC && decoded.Permission_ADMIN_SEC,
              decoded.Permission_ADMIN_PROYECTOS && decoded.Permission_ADMIN_PROYECTOS,
              decoded.Permission_ADMIN_DONACIONES && decoded.Permission_ADMIN_DONACIONES,
              decoded.Permission_ADMIN_REQUISITOS && decoded.Permission_ADMIN_REQUISITOS
            ].filter(Boolean)
          }
          console.log('usuario');
          console.log(this._usuario);
        }
      }),
      mapTo(true),
      catchError((error) => { throw error })
    )
  }

  getUserById(id: string) {
    const url = `${this.baseUrl}/usuario/${id}`;
    return this.httpCliente.get<User>(url);
  }

  private setCurrentUserId(userId: string) {
    this._currentUserId = userId;
    localStorage.setItem(this.CURRENT_USER_ID, userId);
  }

  setCurrentUser(user: any) {
    this._currentUser = user;
    this.setCurrentUserId(user.id.toString());
  }

  private storeTokens(tokens: AuthResponse) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt!);
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['/']);
  }
}
