/// <reference path="../lib/babylon.d.ts"/>
/// <reference path="../lib/jquery.d.ts"/>

class Main {

  public static Canvas: HTMLCanvasElement;
  public static Engine: BABYLON.Engine;
  public static Scene: BABYLON.Scene;
  public static Camera: BABYLON.ArcRotateCamera;
  public static Light: BABYLON.HemisphericLight;

  public static Sliding: boolean = false;
  public static LockedMouse: boolean = false;
  public static ClientXOnLock: number = -1;
  public static ClientYOnLock: number = -1;

  constructor(canvasElement: string) {
    Main.Canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    Main.Engine = new BABYLON.Engine(Main.Canvas, true);
  }

  public CreateScene(): void {
    Main.Scene = new BABYLON.Scene(Main.Engine);

    Main.Camera = new BABYLON.ArcRotateCamera("ArcCamera", 0, 0, 1, BABYLON.Vector3.Zero(), Main.Scene);
    Main.Camera.setPosition(new BABYLON.Vector3(256, 256, 256));
    Main.Camera.attachControl(Main.Canvas);

    Main.Light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), Main.Scene);
    Main.Light.diffuse = new BABYLON.Color3(1, 1, 1);
    Main.Light.specular = new BABYLON.Color3(1, 1, 1);
  }

  public Animate(): void {
    Main.Engine.runRenderLoop(() => {
      Main.Scene.render();
    });

    window.addEventListener("resize", () => {
      Main.Engine.resize();
    });
  }

  public LoadTerrainFromBabylonFile(): void {
    let t0: Date = new Date();
    BABYLON.SceneLoader.ImportMesh(
      "",
      "./datas/terrain256.babylon",
      "",
      Main.Scene,
      (
        meshes: Array<BABYLON.AbstractMesh>,
        particles: Array<BABYLON.ParticleSystem>,
        skeletons: Array<BABYLON.Skeleton>
      ) => {
        console.log("Terrain Successfuly loaded.");
        let t1: Date = new Date();
        $("#loading-time").text((t1.getTime() - t0.getTime()).toString());
      }
    );
  }

  public LoadTerrainFromPNGHeightMap(): void {
    let t0: Date = new Date();
    let img: HTMLImageElement = $("#height-map").get(0);
    img.onload = () => {
      let c: HTMLCanvasElement = document.getElementById("debug-output") as HTMLCanvasElement;
      let ctx: CanvasRenderingContext2D = c.getContext("2d");
      ctx.drawImage(img, 0, 0, 257, 257);

      let mesh: BABYLON.Mesh = new BABYLON.Mesh("Terrain00", Main.Scene);
      let vertexData: BABYLON.VertexData = new BABYLON.VertexData();
      let positions: Array<number> = [];
      let indices: Array<number> = [];
      for (let i: number = 0; i < 129; i++) {
        for (let j: number = 0; j < 129; j++) {
          let pixel: number = ctx.getImageData(i, j, 1, 1).data[0];
          positions.push(i - 128);
          positions.push(pixel / 256 * 100);
          positions.push(j - 128);
          if (i > 0 && j > 0) {
            indices.push(i + j * 129);
            indices.push(i + (j - 1) * 129);
            indices.push((i - 1) + j * 129);
            indices.push((i - 1) + (j - 1) * 129);
            indices.push((i - 1) + j * 129);
            indices.push(i + (j - 1) * 129);
          }
        }
      }
      vertexData.positions = positions;
      vertexData.indices = indices;
      vertexData.normals = [];
      BABYLON.VertexData.ComputeNormals(positions, indices, vertexData.normals);
      vertexData.applyToMesh(mesh);

      mesh = new BABYLON.Mesh("Terrain10", Main.Scene);
      vertexData = new BABYLON.VertexData();
      positions = [];
      indices = [];
      for (let i: number = 0; i < 129; i++) {
        for (let j: number = 0; j < 129; j++) {
          let pixel: number = ctx.getImageData(i + 128, j, 1, 1).data[0];
          positions.push(i);
          positions.push(pixel / 256 * 100);
          positions.push(j - 128);
          if (i > 0 && j > 0) {
            indices.push(i + j * 129);
            indices.push(i + (j - 1) * 129);
            indices.push((i - 1) + j * 129);
            indices.push((i - 1) + (j - 1) * 129);
            indices.push((i - 1) + j * 129);
            indices.push(i + (j - 1) * 129);
          }
        }
      }
      vertexData.positions = positions;
      vertexData.indices = indices;
      vertexData.normals = [];
      BABYLON.VertexData.ComputeNormals(positions, indices, vertexData.normals);
      vertexData.applyToMesh(mesh);

      mesh = new BABYLON.Mesh("Terrain11", Main.Scene);
      vertexData = new BABYLON.VertexData();
      positions = [];
      indices = [];
      for (let i: number = 0; i < 129; i++) {
        for (let j: number = 0; j < 129; j++) {
          let pixel: number = ctx.getImageData(i + 128, j + 128, 1, 1).data[0];
          positions.push(i);
          positions.push(pixel / 256 * 100);
          positions.push(j);
          if (i > 0 && j > 0) {
            indices.push(i + j * 129);
            indices.push(i + (j - 1) * 129);
            indices.push((i - 1) + j * 129);
            indices.push((i - 1) + (j - 1) * 129);
            indices.push((i - 1) + j * 129);
            indices.push(i + (j - 1) * 129);
          }
        }
      }
      vertexData.positions = positions;
      vertexData.indices = indices;
      vertexData.normals = [];
      BABYLON.VertexData.ComputeNormals(positions, indices, vertexData.normals);
      vertexData.applyToMesh(mesh);

      mesh = new BABYLON.Mesh("Terrain01", Main.Scene);
      vertexData = new BABYLON.VertexData();
      positions = [];
      indices = [];
      for (let i: number = 0; i < 129; i++) {
        for (let j: number = 0; j < 129; j++) {
          let pixel: number = ctx.getImageData(i, j + 128, 1, 1).data[0];
          positions.push(i - 128);
          positions.push(pixel / 256 * 100);
          positions.push(j);
          if (i > 0 && j > 0) {
            indices.push(i + j * 129);
            indices.push(i + (j - 1) * 129);
            indices.push((i - 1) + j * 129);
            indices.push((i - 1) + (j - 1) * 129);
            indices.push((i - 1) + j * 129);
            indices.push(i + (j - 1) * 129);
          }
        }
      }
      vertexData.positions = positions;
      vertexData.indices = indices;
      vertexData.normals = [];
      BABYLON.VertexData.ComputeNormals(positions, indices, vertexData.normals);
      vertexData.applyToMesh(mesh);

      let t1: Date = new Date();
      $("#loading-time").text((t1.getTime() - t0.getTime()).toString());
    };
  }

  public DebugGetMeshHeightMap(mesh: BABYLON.AbstractMesh): void {
    let c: HTMLCanvasElement = document.getElementById("debug-output") as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D = c.getContext("2d");
    if (mesh instanceof BABYLON.Mesh) {
      let vertices: Array<number> | Float32Array = BABYLON.VertexData.ExtractFromMesh(mesh).positions;
      for (let i: number = 0; i < vertices.length / 3; i++) {
        let x: number = Math.floor(vertices[3 * i] + 128);
        let y: number = vertices[3 * i + 1];
        let z: number = Math.floor(vertices[3 * i + 2] + 128);
        let c: BABYLON.Color3 = new BABYLON.Color3(y / 100, y / 100, y / 100);
        ctx.fillStyle = c.toHexString();
        ctx.fillRect(x, z, 1, 1);
      }
    } else {
      console.warn("Argument is not a mesh. Aborting");
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  let game : Main = new Main("render-canvas");
  game.CreateScene();
  game.Animate();
  if ($("#babylon-file").get(0)) {
    console.log("Load Terrain from Babylon file");
    game.LoadTerrainFromBabylonFile();
  }
  if ($("#png-height-map").get(0)) {
    console.log("Load Terrain from PNG HeightMap");
    game.LoadTerrainFromPNGHeightMap();
  }
});
