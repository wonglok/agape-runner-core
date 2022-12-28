import { KaitaiStream } from 'kaitai-struct'
import { BlenderBlend } from './BlendBlend'
// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

class BlenderReader {
  constructor({ arrayBuffer }) {
    //

    let stream = new KaitaiStream(arrayBuffer)

    let data = new BlenderBlend(stream)

    console.log(data)
  }
}

export { BlenderReader }
