/*
 * index.ts
 * Copyright (C) 2022 veypi <veypi@qq.com>
 * 2022-05-27 18:06
 * Distributed under terms of the MIT license.
 */


class Message {

    private box: HTMLDivElement
    private timeout: number

    constructor(id: string, timeout?: number) {
        this.timeout = timeout || 100
        this.box = document.getElementById(id) as HTMLDivElement
        if (!this.box) {
            console.error('can not found element ' + id)
            return
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
    Warn(text: string) {
        this.base(text, ['v-msg-warn'], this.timeout + 1500)
    }
    Info(text: string) {
        this.base(text, ['v-msg-info'], this.timeout + 500)
    }
}

export { Message }

let msg: Message

function defaultMessage() {
    console.log('init message')
    if (!msg) {
        msg = new Message('v-msg')
    }
    return msg
}

export default defaultMessage()
