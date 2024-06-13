/*
 * index.ts
 * Copyright (C) 2022 veypi <veypi@qq.com>
 * 2022-05-27 18:06
 * Distributed under terms of the MIT license.
 */

import './index.css'

let conf = {
    timeout: 1000,
}


class Message {

    private box: HTMLDivElement

    constructor(id: string,) {
        this.box = document.getElementById(id) as HTMLDivElement
        if (!this.box) {
            console.info('create vmsg div ' + id)
            this.box = document.createElement("div")
            this.box.id = id
            document.body.appendChild(this.box)
        }
        this.box.classList.add('v-msg-box')
    }
    private base(text: string, classList: string[], timeout: number) {
        let msg = document.createElement('div')
        msg.classList.add('v-msg-item')
        msg.classList.add(...classList)
        msg.innerText = text
        this.box.appendChild(msg)
        setTimeout(() => {
            msg.classList.add('v-msg-item-remove')
            msg.onanimationend = () => {
                this.box.removeChild(msg)
            }
        }, timeout)
    }
    private withinput(title: string, value: string): Promise<string> {
        let box = document.createElement('div')
        box.classList.add('v-msg-frame')
        box.innerHTML = `
<div class="v-msg-prompt">
  <div class="v-msg-prompt-title">${title}</div>
  <div class='v-msg-prompt-input-frame'>
    <input class="v-msg-prompt-input" />
  </div>
  <div class="v-msg-prompt-btns">
    <button class="v-msg-prompt-cancel v-msg-prompt-btn">取消</button>
    <button class="v-msg-prompt-ok v-msg-prompt-btn">确定</button>
</div>
`
        let input = box.querySelector('input') as HTMLInputElement
        input.value = value
        this.box.appendChild(box)
        return new Promise((resolve, reject) => {
            let bok = box.querySelector('.v-msg-prompt-ok') as HTMLInputElement
            let bcancel = box.querySelector('.v-msg-prompt-cancel') as HTMLInputElement
            bok.onclick = () => {
                resolve(input.value)
                this.box.removeChild(box)
            }
            bcancel.onclick = () => {
                this.box.removeChild(box)
            }
        })
    }
    Prompt(text: string, value: string): Promise<string> {
        return this.withinput(text, value)
    }
    Warn(text: string) {
        this.base(text, ['v-msg-warn'], conf.timeout + 1500)
    }
    Info(text: string) {
        this.base(text, ['v-msg-info'], conf.timeout + 500)
    }
}

export { conf }

let msg: Message

function defaultMessage() {
    console.log('init message')
    if (!msg) {
        msg = new Message('v-msg')
    }
    return msg
}

export default defaultMessage()
