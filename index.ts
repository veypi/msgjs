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
    Prompt(text: string) {
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
