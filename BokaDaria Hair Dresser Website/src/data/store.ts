/* In-memory data store (T008, T030 minimal) */
export type User = { id: string; name: string; username: string } | null;

class Store {
  user: User = null;
  private listeners: Array<() => void> = [];

  subscribe(fn: () => void) {
    this.listeners.push(fn);
    return () => this.unsubscribe(fn);
  }
  unsubscribe(fn: () => void) {
    this.listeners = this.listeners.filter((l) => l !== fn);
  }
  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  login(username: string, password: string) {
    // Very simple mock: accept username "demo" and password "demo"
    if (username === "demo" && password === "demo") {
      this.user = { id: "u1", name: "Demo User", username };
      this.notify();
      return true;
    }
    return false;
  }

  logout() {
    this.user = null;
    this.notify();
  }
}

export const store = new Store();
