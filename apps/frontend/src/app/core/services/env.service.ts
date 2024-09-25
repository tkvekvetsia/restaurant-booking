import { inject, Injectable } from '@angular/core';
import { Env, initEnvironment } from '@restaurant-booking/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnvService extends Env {
  private http = inject(HttpClient);

  constructor() {
    super();
  }

  public loadEnv() {
    return firstValueFrom(this.http.get<Env>('./env.json?t=' + Date.now()))
      .then(env => {
        if (env) {
          initEnvironment(env);
        }
      })
      .catch(() => {
        console.error('Failed to load environment');
      });
  }
}

export function loadEnvFactory(envService: EnvService) {
  return () => envService.loadEnv();
}
