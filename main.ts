/*
Copyright (C): 2010-2019, Shenzhen Yahboom Tech
modified from liusen
load dependency
"Tinybit": "file:../pxt-Tinybit"
*/

//% color="#006400" weight=20 icon="\uf1b9"
namespace Tinybit {

    const PWM_ADD = 0x01
    const MOTOR = 0x02
    const RGB = 0x01
    
    let yahStrip: neopixel.Strip;

    export enum enColor {

        //% blockId="OFF" block="OFF"
        OFF = 0,
        //% blockId="Red" block="Red"
        Red,
        //% blockId="Green" block="Green"
        Green,
        //% blockId="Blue" block="Blue"
        Blue,
        //% blockId="White" block="White"
        White,
        //% blockId="Cyan" block="Cyan"
        Cyan,
        //% blockId="Pinkish" block="Pinkish"
        Pinkish,
        //% blockId="Yellow" block="Yellow"
        Yellow,

    }
    export enum enMusic {

        //% blockId="dadadum" block="dadadum"
        dadadum = 0,
        //% blockId="entertainer" block="entertainer"
        entertainer,
        //% blockId="prelude" block="prelude"
        prelude,
        //% blockId="ode" block="ode"
        ode,
        //% blockId="nyan" block="nyan"
        nyan,
        //% blockId="ringtone" block="ringtone"
        ringtone,
        //% blockId="funk" block="funk"
        funk,
        //% blockId="blues" block="blues"
        blues,
        //% blockId="birthday" block="birthday"
        birthday,
        //% blockId="wedding" block="wedding"
        wedding,
        //% blockId="funereal" block="funereal"
        funereal,
        //% blockId="punchline" block="punchline"
        punchline,
        //% blockId="baddy" block="baddy"
        baddy,
        //% blockId="chase" block="chase"
        chase,
        //% blockId="ba_ding" block="ba_ding"
        ba_ding,
        //% blockId="wawawawaa" block="wawawawaa"
        wawawawaa,
        //% blockId="jump_up" block="jump_up"
        jump_up,
        //% blockId="jump_down" block="jump_down"
        jump_down,
        //% blockId="power_up" block="power_up"
        power_up,
        //% blockId="power_down" block="power_down"
        power_down

    }
    export enum enPos {

        //% blockId="LeftState" block="LeftState"
        LeftState = 0,
        //% blockId="RightState" block="RightState"
        RightState = 1
    }

    export enum enLineState {
        //% blockId="White" block="White Line"
        White = 0,
        //% blockId="Black" block="Black Line"
        Black = 1
    }
    
    
    export enum CarState {
        //% blockId="Car_Run" block="Run"
        Car_Run = 1,
        //% blockId="Car_Back" block="Back"
        Car_Back = 2,
        //% blockId="Car_Left" block="Left"
        Car_Left = 3,
        //% blockId="Car_Right" block="Right"
        Car_Right = 4,
        //% blockId="Car_Stop" block="Stop"
        Car_Stop = 5,
        //% blockId="Car_SpinLeft" block="SpinLeft"
        Car_SpinLeft = 6,
        //% blockId="Car_SpinRight" block="SpinRight"
        Car_SpinRight = 7
    }

    function setPwmRGB(red: number, green: number, blue: number): void {

        let buf = pins.createBuffer(4);
        buf[0] = RGB;
        buf[1] = red;
        buf[2] = green;
        buf[3] = blue;
        
        pins.i2cWriteBuffer(PWM_ADD, buf);
    }

    function setPwmMotor(mode: number, speed1: number, speed2: number): void {
        if (mode < 0 || mode > 6)
            return;
        
        let buf = pins.createBuffer(5);
        buf[0] = MOTOR;
        switch (mode) { 
            case 0: buf[1] = 0; buf[2] = 0; buf[3] = 0; buf[4] = 0; break;              //stop
            case 1: buf[1] = speed1; buf[2] = 0; buf[3] = speed2; buf[4] = 0; break;    //run
            case 2: buf[1] = 0; buf[2] = speed1; buf[3] = 0; buf[4] = speed2; break;    //back
            case 3: buf[1] = 0; buf[2] = 0; buf[3] = speed2; buf[4] = 0; break;         //left
            case 4: buf[1] = speed1; buf[2] = 0; buf[3] = 0; buf[4] = 0; break;         //right
            case 5: buf[1] = 0; buf[2] = speed1; buf[3] = speed2; buf[4] = 0; break;    //tleft
            case 6: buf[1] = speed1; buf[2] = 0; buf[3] = 0; buf[4] = speed2; break;    //tright
        }
        pins.i2cWriteBuffer(PWM_ADD, buf);
    }

    function Car_run(speed1: number, speed2: number) {


        setPwmMotor(1, speed1, speed2);
    }

    function Car_back(speed1: number, speed2: number) {

        setPwmMotor(2, speed1, speed2);
    }

    function Car_left(speed1: number, speed2: number) {

        setPwmMotor(3, speed1, speed2);
    }

    function Car_right(speed1: number, speed2: number) {

        setPwmMotor(4, speed1, speed2);
    }

    function Car_stop() {
       
        setPwmMotor(0, 0, 0);
    }

    function Car_spinleft(speed1: number, speed2: number) {

        setPwmMotor(5, speed1, speed2);
    } 

    function Car_spinright(speed1: number, speed2: number) {

        setPwmMotor(6, speed1, speed2);
    }

    /**
     * *****************************************************************
     * @param index
     */   

    //% blockId=Tinybit_RGB_Car_Program block="RGB_Car_Program"
    //% weight=99
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Program(): neopixel.Strip {
         
        if (!yahStrip) {
            yahStrip = neopixel.create(DigitalPin.P12, 2, NeoPixelMode.RGB);
        }
        return yahStrip;  
    }  

    //% blockId=Tinybit_RGB_Car_Big block="RGB_Car_Big|value %value"
    //% weight=98
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Big(value: enColor): void {

        switch (value) {
            case enColor.OFF: {
                setPwmRGB(0, 0, 0);
                break;
            }
            case enColor.Red: {
                setPwmRGB(255, 0, 0);
                break;
            }
            case enColor.Green: {
                setPwmRGB(0, 255, 0);
                break;
            }
            case enColor.Blue: {
                setPwmRGB(0, 0, 255);
                break;
            }
            case enColor.White: {
                setPwmRGB(255, 255, 255);
                break;
            }
            case enColor.Cyan: {
                setPwmRGB(0, 255, 255);
                break;
            }
            case enColor.Pinkish: {
                setPwmRGB(255, 0, 255);
                break;
            }
            case enColor.Yellow: {
                setPwmRGB(255, 255, 0);
                break;
            }
        }
    }
    //% blockId=Tinybit_RGB_Car_Big2 block="RGB_Car_Big2|value1 %value1|value2 %value2|value3 %value3"
    //% weight=97
    //% blockGap=10
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Big2(value1: number, value2: number, value3: number): void {

        setPwmRGB(value1, value2, value3);

    }
    //% blockId=Tinybit_Music_Car block="Music_Car|%index"
    //% weight=95
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Music_Car(index: enMusic): void {
        switch (index) {
            case enMusic.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case enMusic.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case enMusic.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case enMusic.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case enMusic.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case enMusic.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case enMusic.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case enMusic.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case enMusic.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case enMusic.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case enMusic.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case enMusic.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case enMusic.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case enMusic.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case enMusic.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case enMusic.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case enMusic.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case enMusic.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case enMusic.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case enMusic.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }
    
    
    
    //% blockId=Tinybit_CarCtrl block="CarCtrl|%index"
    //% weight=93
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrl(index: CarState): void {
        switch (index) {
            case CarState.Car_Run: Car_run(255, 255); break;
            case CarState.Car_Back: Car_back(255, 255); break;
            case CarState.Car_Left: Car_left(255, 255); break;
            case CarState.Car_Right: Car_right(255, 255); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(255, 255); break;
            case CarState.Car_SpinRight: Car_spinright(255, 255); break;
        }
    }
    
    //% blockId=Tinybit_CarCtrlSpeed block="CarCtrlSpeed|%index|speed %speed"
    //% weight=92
    //% blockGap=10
    //% speed.min=0 speed.max=255
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrlSpeed(index: CarState, speed: number): void {
        switch (index) {
            case CarState.Car_Run: Car_run(speed, speed); break;
            case CarState.Car_Back: Car_back(speed, speed); break;
            case CarState.Car_Left: Car_left(speed, speed); break;
            case CarState.Car_Right: Car_right(speed, speed); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(speed, speed); break;
            case CarState.Car_SpinRight: Car_spinright(speed, speed); break;
        }
    }
    
    //% blockId=Tinybit_CarCtrlSpeed2 block="CarCtrlSpeed2|%index|speed1 %speed1|speed2 %speed2"
    //% weight=91
    //% blockGap=10
    //% speed1.min=0 speed1.max=255 speed2.min=0 speed2.max=255
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrlSpeed2(index: CarState, speed1: number, speed2: number): void {
        switch (index) {
            case CarState.Car_Run: Car_run(speed1, speed2); break;
            case CarState.Car_Back: Car_back(speed1, speed2); break;
            case CarState.Car_Left: Car_left(speed1, speed2); break;
            case CarState.Car_Right: Car_right(speed1, speed2); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(speed1, speed2); break;
            case CarState.Car_SpinRight: Car_spinright(speed1, speed2); break;
        }
    }    
        
   
    
    //% blockId=Tinybit_Line_Sensor block="Line_Sensor|direct %direct|value %value"
    //% weight=89
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Line_Sensor(direct: enPos, value: enLineState): boolean {

        let temp: boolean = false;
        pins.setPull(DigitalPin.P13, PinPullMode.PullNone);
        pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
        switch (direct) {
            case enPos.LeftState: {
                if (pins.digitalReadPin(DigitalPin.P13) == value) {              
                    temp = true;                  
                }
                else {                  
                     temp = false;
                }
                break;
            }

            case enPos.RightState: {
                if (pins.digitalReadPin(DigitalPin.P14) == value) {              
                    temp = true;                  
                }
                else {
                    temp = false;
                }
                break;
            }
        }
        return temp;

    }

    //% blockId=Tinybit_Voice_Sensor block="Voice Sensor return"
    //% weight=88
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Voice_Sensor(): number {
	    //pins.setPull(DigitalPin.P1, PinPullMode.PullUp);
        let temp  = 0;		
        temp = pins.analogReadPin(AnalogPin.P1);           
            
        return temp;

    }
        
    //% blockId=Tinybit_Ultrasonic_Car block="ultrasonic return distance(cm)"
    //% color="#006400"
    //% weight=87
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic_Car(): number {

       	let list:Array<number> = [0, 0, 0, 0, 0];
				for (let i = 0; i < 5; i++)
				{
					pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
					pins.digitalWritePin(DigitalPin.P16, 0);
					control.waitMicros(2);
					pins.digitalWritePin(DigitalPin.P16, 1);
					control.waitMicros(15);
					pins.digitalWritePin(DigitalPin.P16, 0);
					let d = pins.pulseIn(DigitalPin.P15, PulseValue.High, 43200);
					list[i] = Math.floor(d / 40);
				}
				list.sort();
				let length = (list[1] + list[2] + list[3])/3;
				return  Math.floor(length);
    }
        
    //% blockId=Tinybit_Ultrasonic_CarV2 block="ultrasonic for V2 return distance(cm)"
    //% color="#006400"
    //% weight=87
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic_CarV2(): number {
		pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
		pins.digitalWritePin(DigitalPin.P16, 0);
		control.waitMicros(4);
		pins.digitalWritePin(DigitalPin.P16, 1);
		control.waitMicros(10);
		pins.digitalWritePin(DigitalPin.P16, 0);

		let d = pins.pulseIn(DigitalPin.P15, PulseValue.High, 500 * 58);
        return  Math.floor(d / 58);

    }

    let PID_state = 0;//状态 1：初始化PID
    let PID_state_x = 0;//x方向 状态 0:没初始化
    let PID_state_y = 0;//y方向

    //X方向的
    let PID_P_X = 0;
    let PID_I_X = 0;
    let PID_D_X = 0;
    let PID_err_X = 0;
    let PID_err_next_X = 0;
    let PID_err_last_X = 0;
    let PID_target_X = 0;
    let PID_last_result_X = 0;

    //Y方向的
    let PID_P_Y = 0;
    let PID_I_Y = 0;
    let PID_D_Y = 0;
    let PID_err_Y = 0;
    let PID_err_next_Y = 0;
    let PID_err_last_Y = 0;
    let PID_target_Y = 0;
    let PID_last_result_Y = 0;

    function car_sport(sp_L:number,sp_R:number)
    {
        let buf = pins.createBuffer(5);
        buf[0] = MOTOR;

        if (sp_L < 0)//反转
        {
            buf[1] = 0;
            buf[2] = -sp_L;
        }
        else //正转
        {
            buf[1] = sp_L;
            buf[2] = 0;
        }

        if (sp_R < 0)//反转
        {
            buf[3] = 0;
            buf[4] = -sp_R;
        }
        else //正转
        {
            buf[3] = sp_R;
            buf[4] = 0;
        }

        pins.i2cWriteBuffer(PWM_ADD, buf);

    }


    //% blockId=X_PID block="x_PID|target %target|X_P %P|X_I %I|X_D %D"
    //% color="#36648B"
    //% weight=87
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function k210_PID_init_X(target:number,P:number,I:number,D:number)
    {
        PID_P_X = P/100;
        PID_I_X = I/100;
        PID_D_X = D/100;
        PID_target_X = target;
        PID_state = PID_state + 1;
        PID_state_x = 1;
    }

    //% blockId=Y_PID block="Y_PID|target %target|Y_P %P|Y_I %I|Y_D %D"
    //% color="#36648B"
    //% weight=87
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function k210_PID_init_Y(target:number,P:number,I:number,D:number)
    {
        PID_P_Y = P/100;
        PID_I_Y = I/100;
        PID_D_Y = D/100;
        PID_target_Y = target;
        PID_state = PID_state + 1;
        PID_state_y = 1;
    }

    //增量式PID
    function k210_PID_deal(actual_value:number,flag:number):number
    {
        let result = 0;
        switch(flag)
        {   
            //flag 0:x的PID方向处理  1:y的PID方向处理
            case 0 :
                PID_err_X = PID_target_X - actual_value;
                result = PID_last_result_X + 
                        PID_P_X * (PID_err_X - PID_err_next_X) + 
                        PID_I_X * PID_err_X + 
                        PID_D_X * (PID_err_X - 2 * PID_err_next_X + PID_err_last_X);

                PID_err_last_X = PID_err_next_X;
                PID_err_next_X = PID_err_X;
                PID_last_result_X = result;
                    //防死区
                    // if (result >0 && result <60)
                    // {
                    //     result = 60;
                    // }
                    // else if(result <0 && result >-60)
                    // {
                    //     result = -60;
                    // }
            break;

            case 1:
                PID_err_Y = PID_target_Y - actual_value;
                result = PID_last_result_Y + 
                        PID_P_Y * (PID_err_Y - PID_err_next_Y) + 
                        PID_I_Y * PID_err_Y + 
                        PID_D_Y * (PID_err_Y - 2 * PID_err_next_Y + PID_err_last_Y);

                PID_err_last_Y = PID_err_next_Y;
                PID_err_next_Y = PID_err_Y;
                PID_last_result_Y = result;
                //防死区
                // if (result >0 && result <55)
                // {
                //     result = 55;
                // }
                // else if(result <0 && result >-55)
                // {
                //     result = -55;
                // }
            break;

            default : result = 0;
        }
        return result;
    }

    
    //% blockId=Tinybit_follow_apriltags block="Follow Apriltags|k210_x %x|k210_y %y|k210_w %w|k210_h %h|k210_speed %speed_min|zhong %zhong|ingro %speed_ingro|spmax %spmax"
    //% color="#006400"
    //% weight=87
    //% blockGap=10
    //% x.min=0 x.max=320 y.min=0 y.max=240 w.min=0 w.max=320 h.min=0 h.max=240 speed_min.min = 10 speed_min.max = 70 zhong.min = 0 zhong.min = 40
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function follow_apriltags(x:number,y:number,w:number,h:number,speed_min:number,zhong:number,speed_ingro:number,spmax:number)
    {
        let speed_L = 0;
        let speed_R = 0;
        let res_x = 0;
        let res_y = 0;
        let apr_x = 0;
        let apr_y = 0;
        
        //初始化PID,***后面在封成库里面，现在PID先开放，调试用***
        if(PID_state < 2)//积木块不初始化PID
        {
            if(PID_state == 0)
            {
                k210_PID_init_X(0, 30, 0, 0);//0：左右偏的方向为0，即没误差
                k210_PID_init_Y(0, 50, 0, 0);
            }
            else if (PID_state == 1)//只初始化一个PID方向
            {
                if(PID_state_x == 0)//只初始化y方向
                {
                    k210_PID_init_X(0, 30, 0, 0);//0：左右偏的方向为0，即没误差
                }
                else if(PID_state_y == 0)//只初始化x方向
                {
                    k210_PID_init_Y(0, 50, 0, 0);
                }
                
            }

            PID_state = 2;
           
        }


        //检测不到，小车停止
        if(w==0 || h==0)
        {
            Car_stop();
            //frist_flag = 0;
            return;
        }

        if(x==0 || y==0)//不可能出现这个值
        {
            //frist_flag = 0;
            Car_stop();
            return;
        }

        apr_x =80 - x; //80:机器码X中心点
        apr_y =y - 60; //60：机器码Y中心点

        if((apr_x<zhong&&apr_x>-zhong)&&(apr_y<zhong&&apr_y>-zhong))
        {
            Car_stop();
            //basic.showNumber(apr_x);
            return;
        }

        //PID处理
        res_x = k210_PID_deal(apr_x,0);//进行x的方向PID处理
        res_y = k210_PID_deal(apr_y,1);//进行y的方向PID处理

        //误差转成速度
        speed_L = res_y + 0 + res_x;
        speed_R = res_y - 0 - res_x;

        // 防死区
        if(speed_L >speed_ingro && speed_L <speed_min)
        {
            speed_L = speed_min;
        }
        else if(speed_L <-speed_ingro && speed_L > -speed_min)
        {
            speed_L = -speed_min;
        }
        
        if(speed_R >speed_ingro && speed_R <speed_min)
        {
            speed_R = speed_min;
        }
        else if(speed_R <-speed_ingro && speed_R > -speed_min)
        {
            speed_R = -speed_min;
        }

        
        // //不超过最大速度
        if(speed_L >spmax)
        {
            speed_L = spmax;
        }
        else if(speed_L < -spmax)
        {
            speed_L = -spmax;
        }

        if(speed_R >spmax)
        {
            speed_R = spmax;
        }
        else if(speed_R < -spmax)
        {
            speed_R = -spmax;
        }

        //PID处理后再传速度
        car_sport(speed_L,speed_R);
        
    }


    //% blockId=Tinybit_follow_color block="Follow Color|k210_x %x|k210_y %y|k210_w %w|k210_h %h|k210_speed %speed_min|middle %zhong|ingro %speed_ingro|spmax %spmax"
    //% color="#D15FEE"
    //% weight=87
    //% blockGap=10
    //% x.min=0 x.max=320 y.min=0 y.max=240 w.min=0 w.max=320 h.min=0 h.max=240 speed_min.min=10 speed_max.max=70 zhong.min=10 zhong.min=70
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function follow_color(x:number,y:number,w:number,h:number,speed_min:number,zhong:number,speed_ingro:number,spmax:number)
    {
        let speed_L = 0;
        let speed_R = 0;
        let res_x = 0;
        let res_y = 0;
        let apr_x = 0;
        let apr_y = 0;
        
        //初始化PID,***后面在封成库里面，现在PID先开放，调试用***
        // if(PID_state == 0)
        // {
        //     k210_PID_init_X(0, 0.5, 0, 0.01);//0：左右偏的方向为0，即没误差
        //     k210_PID_init_Y(75, 0.9, 0, 0.01);//75：默认没误差的前进速度
        //     PID_state = 1;
        // }

         //检测不到，小车停止
         if(w==0 && h==0)
         {
            Car_stop();
            return;
         }

        if(x==0 || y==0)//不可能出现这个值
        {
            //frist_flag = 0;
            Car_stop();
            return;
        }

        apr_x =160 - x; 
        apr_y =y - 120; 

        if((apr_x<zhong&&apr_x>-zhong)&&(apr_y<zhong&&apr_y>-zhong))
        {
            Car_stop();
            return;
        }

        //PID处理
        res_x = k210_PID_deal(apr_x,0);//进行x的方向PID处理
        res_y = k210_PID_deal(apr_y,1);//进行y的方向PID处理

        res_x = res_x/2;
        res_y = res_y/2;

        //误差转成速度
        speed_L = res_y + 0 + res_x;
        speed_R = res_y - 0 - res_x;

        //防死区
        if(speed_L >speed_ingro && speed_L <speed_min)
        {
            speed_L = speed_min;
        }
        else if(speed_L <-speed_ingro && speed_L > -speed_min)
        {
            speed_L = -speed_min;
        }
        
        if(speed_R >speed_ingro && speed_R <speed_min)
        {
            speed_R = speed_min;
        }
        else if(speed_R <-speed_ingro && speed_R > -speed_min)
        {
            speed_R = -speed_min;
        }


        //不超过最大速度
        if(speed_L >spmax)
        {
            speed_L = spmax;
        }
        else if(speed_L < -spmax)
        {
            speed_L = -spmax;
        }

        if(speed_R >spmax)
        {
            speed_R = spmax;
        }
        else if(speed_R < -spmax)
        {
            speed_R = -spmax;
        }

        //PID处理后再传速度
        car_sport(speed_L,speed_R);
    }

    //% blockId=Tinybit_color_line block="Color Line|speedLine %speedLine|k210_x %x|k210_y %y|k210_w %w|k210_h %h|spmax %spmax"
    //% color="#EE7AE9"
    //% weight=87
    //% blockGap=10
    //% speedLine.min=10 speedLine.max=200 x.min=0 x.max=320 y.min=0 y.max=240 w.min=0 w.max=320 h.min=0 h.max=240
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function color_line(speedLine:number,x:number,y:number,w:number,h:number,spmax:number)
    {
        let speed_L = 0;
        let speed_R = 0;
        let res_x = 0;
        let apr_x = 0;
        //初始化PID,***后面在封成库里面，现在PID先开放，调试用***
        // if(PID_state == 0)
        // {
        //     k210_PID_init_X(0, 0.5, 0, 0.01);//0：左右偏的方向为0，即没误差
        //     PID_state = 1;
        // }

        if(x==0 || y==0)//不可能出现这个值
        {
            //frist_flag = 0;
            return;
        }

        //检测不到，保留上一个状态
        if(w==0 && h==0)
        {
            // Car_stop();
            return;
        }

        apr_x =160 - x; 

        //PID处理
        res_x = k210_PID_deal(apr_x,0);//进行x的方向PID处理

        //误差转成速度
        speed_L = speedLine + 0 + res_x;
        speed_R = speedLine - 0 - res_x;


        //不超过最大速度
        if(speed_L >spmax)
        {
            speed_L = spmax;
        }
        else if(speed_L < -spmax)
        {
            speed_L = -spmax;
        }

        if(speed_R >spmax)
        {
            speed_R = spmax;
        }
        else if(speed_R < -spmax)
        {
            speed_R = -spmax;
        }

        //PID处理后再传速度
        car_sport(speed_L,speed_R);
    }

}