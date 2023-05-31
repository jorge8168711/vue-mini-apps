import { nanoid } from 'nanoid'

export class Todo {
  private _content = ''
  private _completed = false
  id = ''
  created = new Date()

  constructor(content: string, id = nanoid(), completed = false) {
    this.id = id
    this._content = content
    this._completed = completed
  }

  public set content(newContent: string) {
    this._content = newContent
  }

  public get content() {
    return this._content
  }

  public set completed(newCompleted: boolean) {
    this._completed = newCompleted
  }

  public get completed() {
    return this._completed
  }
}
