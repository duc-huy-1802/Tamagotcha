class Timer {
  private seconds: number = 60;
  private startTime: Date;

  constructor() {
    this.startTime = new Date();
  }

  public start() {
    this.startTime = new Date();
  }

  public stop(): void {

  }

  public reset() {

  }

  public timeElapsed() {
    let now = new Date();
    return now.getTime() - this.startTime?.getTime();
  }

}

async function test() {
  let t = new Timer();
  t.start();
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log(t.timeElapsed());
}

test();