<script setup lang="ts">
import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  loadAssetContainerAsync,
  Scene,
  Vector3,
  AssetContainer
} from '@babylonjs/core'

const canvasRef = ref<HTMLCanvasElement>()

const $props = defineProps<{
  model: string
}>()

async function init(canvas: HTMLCanvasElement) {
  const { objectUrl, fileExtension } = await fetchAsset($props.model)

  const engine = new Engine(canvas, true)
  const scene = createScene(engine)
  const asset = await loadAsset(scene, objectUrl, fileExtension)

  asset.addAllToScene()

  engine.runRenderLoop(() => {
    scene.render()
  })

  return {
    engine,
    scene,
    asset
  }
}

function createScene(engine: Engine) {
  const scene = new Scene(engine)

  const camera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene)
  camera.attachControl(engine.getRenderingCanvas(), true)

  const light = new HemisphericLight('light', new Vector3(1, 1, 0))
  scene.addLight(light)

  return scene
}

async function fetchAsset(url: string) {
  const response = await fetch(url)
  const fileExtension = url.split('.').pop()?.replace('?raw=true', '') || 'glb'

  const buffer = await response.arrayBuffer()
  const blob = new Blob([new Uint8Array(buffer)], {
    type: `model/${fileExtension === 'glb' ? 'model/gltf-binary' : 'text/plain'}`
  })

  return {
    fileExtension,
    objectUrl: URL.createObjectURL(blob)
  }
}

async function loadAsset(scene: Scene, objectUrl: string, fileExtension: string): Promise<AssetContainer> {
  console.info(scene, objectUrl, fileExtension)

  const asset = await loadAssetContainerAsync(objectUrl, scene, {
    pluginExtension: `.${fileExtension}`
  })

  asset.createRootMesh()
  asset.populateRootNodes()

  return asset
}

onMounted(async () => {
  const { engine, scene, asset } = await init(canvasRef.value!)

  console.info('Model loaded:', asset)

  onBeforeUnmount(() => {
    asset.dispose()
    scene.dispose()
    engine.dispose()
  })
})
</script>

<template>
  {{ model }}
  <canvas ref="canvasRef"></canvas>
</template>
