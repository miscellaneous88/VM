import { Codes } from "./code.js"

class JavaScriptVirtualMachine {
    constructor(ByteCode){
        this.Ptr = 0;
        this.stack = [];
        this.Code = ByteCode;
    }

    Execute(){
        while(this.Ptr < this.Code.length){
            const Rules = this.Code[this.Ptr++];
            switch(Rules){
                case Codes['LOAD']: {
                    this.stack.push(this.Code[this.Ptr++]);
                    break;
                }

                case Codes['ADD']: {
                    const a = this.stack.pop();
                    const b = this.stack.pop();
                    this.stack.push(a + b);
                    break;
                }

                case Codes['SUB']: {
                    const a = this.stack.pop();
                    const b = this.stack.pop();
                    this.stack.push(a - b);
                    break;
                }

                case Codes['MUL']: {
                    const a = this.stack.pop();
                    const b = this.stack.pop();
                    this.stack.push(a * b);
                    break;
                }

                case Codes['DIV']: {
                    const a = this.stack.pop();
                    const b = this.stack.pop();
                    this.stack.push(a / b);
                    break;
                }

                case Codes['RNG']: {
                    this.stack.push(Math.random());
                    break;
                }

                case Codes['GREATER_THAN']: {
                    this.stack.push(this.stack.pop() < this.stack.pop());
                    break;
                }

                case Codes['IF']: {
                    const val = this.stack.pop();
                    const dst = this.Code[this.Ptr++];
                    if(!val) this.Ptr = dst;
                    break;
                }

                case Codes['JUMP']: {
                    this.Ptr = this.Code[this.Ptr++];
                    break;
                }

                case Codes['STDOUT']: {
                    console.log(this.stack.pop());
                    break;
                }
            }
        }
    }
}

//you can use this code to test the VM
const Code = [
    Codes['LOAD'], 1,
    Codes['LOAD'], 12,
    Codes['ADD'],
    Codes['STDOUT'],
]

const vm = new JavaScriptVirtualMachine(Code);
vm.Execute();