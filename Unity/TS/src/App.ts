import ue = CS.UnityEngine;                                                                         // 是用来协助进行类型检查和声明的，在运行时是完全不存在
import Ticker from './Core/Ticker';
import TestSendCoin from "./Example/TransferCoin";
const { GameObject, Vector2, Vector3, RenderMode, Camera, Canvas,
    LightType, FontStyle, UI, CameraClearFlags, EventSystems,
     TextAnchor, LightmapBakeType} = CS.UnityEngine;
const {CanvasScaler} = CS.UnityEngine.UI;

const {$typeof} = puer;

namespace Game {
    interface GameOption {
        maxFps?:number,
        online?:boolean
    }
    interface GameObj {
        object:ue.GameObject,
        components?:{
            camera?:ue.Camera,
            canvas?:ue.Canvas,
            canvaslScale?:ue.UI.CanvasScaler,
            graphicRaycaster?:ue.UI.GraphicRaycaster
            eventSystem?:ue.EventSystems.EventSystem,
            standaloneInputModule?:ue.EventSystems.StandaloneInputModule,
            text?:ue.UI.Text,
            rectTransform?:ue.RectTransform,
            slider?:ue.UI.Slider
        }
    }

    export class App{
        private _maxFps:number;                                                                     
        private ticker:Ticker;
        public static mainCamera:ue.GameObject;
        public static uiCamera:ue.GameObject;
        public static uiCanvas:ue.GameObject;
        public static eventSystem:ue.GameObject;
        public static stage:ue.GameObject;


        constructor(option?:GameOption){
            if(option){
                for(let key in option){
                    this[key] = option[key];
                };
            };
            if(!this.MaxFps){
                this.MaxFps = 60;
            };
            if(!this.MaxFps){
                this.MaxFps = 60;
            };
            this.ticker = new Ticker(this.MaxFps);                                                  
        }

        /**
         * Entry
         */
        async init():Promise<void>{
            this.ticker.start();
            
            const mainCameraObj = this.CreateMainCamera();
            App.mainCamera = mainCameraObj.object;
            
            const uiCameraObj = this.CreateUiCamera();
            App.uiCamera = uiCameraObj.object;
            
            const canvasObj = this.CreateCanvas(uiCameraObj.components.camera);
            App.uiCanvas = canvasObj.object;
            
            const eventSystemObj = this.CreateEventSystem();
            App.eventSystem = eventSystemObj.object;
            
            App.stage = new GameObject("Stage");
           
            Ticker.add(this.OnUpdate);   
                 
            this.TestAptos();
        }

        /**
         * Test Aptos API here
         */
        TestAptos(){
            // Test Send Coin
            const testSendCoin = new TestSendCoin();
            testSendCoin.test();
        }

        /**
         * Update Function
         * @param deltaTime 
         * @param realtimeSinceStartup 
         */
        OnUpdate(deltaTime:number,realtimeSinceStartup:number){
                
        };
       

        

        set MaxFps(val:number){
            this._maxFps = val;
        }
        get MaxFps():number{
            return this._maxFps;
        }

       
        CreateMainCamera():GameObj{
            const object:ue.GameObject = new GameObject("Main Camera");
            let camera:ue.Camera = object.AddComponent($typeof(Camera)) as ue.Camera;
            camera.clearFlags = CameraClearFlags.Skybox;
            camera.cullingMask = ~(1 << 5);                                                        
            camera.nearClipPlane = 2;
            camera.farClipPlane = 40;
            camera.transform.Rotate(20,0,0);
            camera.transform.localScale = new Vector3(0.5,0.5,0.5);
            camera.transform.localPosition = new Vector3(0,7,-20);
            return {object,components:{camera}};
        }

        CreateUiCamera():GameObj{
            const object:ue.GameObject = new GameObject("Ui Camera");
            object.transform.position = new Vector3(-10,0,0);
            const camera:ue.Camera = object.AddComponent($typeof(Camera)) as ue.Camera;
            camera.clearFlags = CameraClearFlags.Depth;
            camera.cullingMask = 1 << 5;                                                            
            camera.orthographic = true; 
            camera.nearClipPlane = 5;
            camera.farClipPlane = 15;
            return {object,components:{camera}};
        }

     
        CreateCanvas(cameraComponent:ue.Camera):GameObj{
            const object:ue.GameObject = new GameObject("Canvas");
            object.layer = 5;                                                                      
            const canvas:ue.Canvas = object.AddComponent($typeof(Canvas)) as ue.Canvas;
            canvas.renderMode = RenderMode.ScreenSpaceCamera;
            canvas.worldCamera = cameraComponent;
            canvas.planeDistance = 10;
            const canvaslScale:ue.UI.CanvasScaler = object.AddComponent($typeof(CanvasScaler)) as ue.UI.CanvasScaler;
            canvaslScale.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            canvaslScale.referenceResolution = new Vector2(428,926);
            canvaslScale.matchWidthOrHeight = 1;
            const graphicRaycaster = object.AddComponent($typeof(UI.GraphicRaycaster)) as ue.UI.GraphicRaycaster;
            return {object,components:{canvas,canvaslScale,graphicRaycaster}};
        }

        /**
         * 创建UI事件系统
         * @returns object
         */
        CreateEventSystem():GameObj{
            const object:ue.GameObject = new GameObject("EventSystem");
            const eventSystem = object.AddComponent($typeof(EventSystems.EventSystem)) as ue.EventSystems.EventSystem;
            const standaloneInputModule = object.AddComponent($typeof(EventSystems.StandaloneInputModule)) as ue.EventSystems.StandaloneInputModule;
            return {object,components:{eventSystem,standaloneInputModule}};
        }
    }
}
(()=>{
    const app = new Game.App({maxFps:60,online:false});
    app.init();
})()
export default Game.App;