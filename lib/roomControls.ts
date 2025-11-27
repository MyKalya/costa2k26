export type ExpireCallback = (id: string) => void;

export class AccessCodeManager {
  private timers = new Map<string, ReturnType<typeof setTimeout>>();
  private visible = new Set<string>();

  constructor(private readonly duration = 10_000) {}

  reveal(id: string, onExpire: ExpireCallback) {
    this.hide(id);
    this.visible.add(id);
    const timer = setTimeout(() => {
      this.visible.delete(id);
      this.timers.delete(id);
      onExpire(id);
    }, this.duration);
    this.timers.set(id, timer);
  }

  hide(id: string) {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
    this.visible.delete(id);
  }

  isVisible(id: string) {
    return this.visible.has(id);
  }

  dispose() {
    this.timers.forEach(clearTimeout);
    this.timers.clear();
    this.visible.clear();
  }
}

type Writer = (text: string) => Promise<void>;

export async function copyWifiPassword(
  wifi: { password?: string } | undefined,
  writer: Writer = (text) => navigator.clipboard.writeText(text),
) {
  if (!wifi?.password) {
    return false;
  }
  await writer(wifi.password);
  return true;
}

