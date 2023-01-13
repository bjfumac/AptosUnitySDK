// 是用来协助进行类型检查和声明的，在运行时是完全不存在
import Ticker from './Core/Ticker.js';
import TestSendCoin from "./Example/TransferCoin.js";
const { GameObject , Vector2 , Vector3 , RenderMode , Camera , Canvas , LightType , FontStyle , UI , CameraClearFlags , EventSystems , TextAnchor , LightmapBakeType  } = CS.UnityEngine;
const { CanvasScaler  } = CS.UnityEngine.UI;
const { $typeof  } = puer;
var Game;
(function(Game) {
    class App {
        /**
         * Entry
         */ async init() {
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
         */ TestAptos() {
            // Test Send Coin
            const testSendCoin = new TestSendCoin();
            testSendCoin.test();
        }
        /**
         * Update Function
         * @param deltaTime 
         * @param realtimeSinceStartup 
         */ OnUpdate(deltaTime, realtimeSinceStartup) {}
        set MaxFps(val) {
            this._maxFps = val;
        }
        get MaxFps() {
            return this._maxFps;
        }
        CreateMainCamera() {
            const object = new GameObject("Main Camera");
            let camera = object.AddComponent($typeof(Camera));
            camera.clearFlags = CameraClearFlags.Skybox;
            camera.cullingMask = ~(1 << 5);
            camera.nearClipPlane = 2;
            camera.farClipPlane = 40;
            camera.transform.Rotate(20, 0, 0);
            camera.transform.localScale = new Vector3(0.5, 0.5, 0.5);
            camera.transform.localPosition = new Vector3(0, 7, -20);
            return {
                object,
                components: {
                    camera
                }
            };
        }
        CreateUiCamera() {
            const object = new GameObject("Ui Camera");
            object.transform.position = new Vector3(-10, 0, 0);
            const camera = object.AddComponent($typeof(Camera));
            camera.clearFlags = CameraClearFlags.Depth;
            camera.cullingMask = 1 << 5;
            camera.orthographic = true;
            camera.nearClipPlane = 5;
            camera.farClipPlane = 15;
            return {
                object,
                components: {
                    camera
                }
            };
        }
        CreateCanvas(cameraComponent) {
            const object = new GameObject("Canvas");
            object.layer = 5;
            const canvas = object.AddComponent($typeof(Canvas));
            canvas.renderMode = RenderMode.ScreenSpaceCamera;
            canvas.worldCamera = cameraComponent;
            canvas.planeDistance = 10;
            const canvaslScale = object.AddComponent($typeof(CanvasScaler));
            canvaslScale.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            canvaslScale.referenceResolution = new Vector2(428, 926);
            canvaslScale.matchWidthOrHeight = 1;
            const graphicRaycaster = object.AddComponent($typeof(UI.GraphicRaycaster));
            return {
                object,
                components: {
                    canvas,
                    canvaslScale,
                    graphicRaycaster
                }
            };
        }
        /**
         * 创建UI事件系统
         * @returns object
         */ CreateEventSystem() {
            const object = new GameObject("EventSystem");
            const eventSystem = object.AddComponent($typeof(EventSystems.EventSystem));
            const standaloneInputModule = object.AddComponent($typeof(EventSystems.StandaloneInputModule));
            return {
                object,
                components: {
                    eventSystem,
                    standaloneInputModule
                }
            };
        }
        constructor(option){
            if (option) {
                for(let key in option){
                    this[key] = option[key];
                }
            }
            if (!this.MaxFps) {
                this.MaxFps = 60;
            }
            if (!this.MaxFps) {
                this.MaxFps = 60;
            }
            this.ticker = new Ticker(this.MaxFps);
        }
    }
    Game.App = App;
})(Game || (Game = {}));
(()=>{
    const app = new Game.App({
        maxFps: 60,
        online: false
    });
    app.init();
})();
export default Game.App;

//# sourceMappingURL=App.js.map