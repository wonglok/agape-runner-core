import { get, set } from 'idb-keyval'

//
export const NS_Projects = 'en_projects'
// export const EN_Resources = 'en_resources'
// export async function provideResourceFolder() {
//   let enFolders = await get(EN_Resources)
//   if (!enFolders) {
//     await set(EN_Resources, [])
//     enFolders = await get(EN_Resources)
//   }
//   return enFolders
// }

// export async function saveResourceFolder(v) {
//   await set(EN_Resources, v)
// }

export async function provideProjects() {
  let enProjs = await get(NS_Projects)
  if (!enProjs) {
    await set(NS_Projects, [])
    enProjs = await get(NS_Projects)
  }
  return enProjs
}

export async function saveProjects(v) {
  await set(NS_Projects, v)
}

export let getDirHandle = async () => {
  try {
    const directoryHandle = await window.showDirectoryPicker()
    return directoryHandle
  } catch (error) {
    console.log(error)
  }
}

export async function verifyPermission(fileHandle, readWrite) {
  const options = {}
  if (readWrite) {
    options.mode = 'readwrite'
  }
  // Check if permission was already granted. If so, return true.
  if ((await fileHandle.queryPermission(options)) === 'granted') {
    return 'granted'
  }
  // Request permission. If the user grants permission, return true.
  if ((await fileHandle.requestPermission(options)) === 'granted') {
    return 'granted'
  }
  // The user didn't grant permission, so return false.
  return 'prompt'
}
