import { HorizontalSection } from '@/components/pages-html/BUCodeStudio/Layout/Generic/HorizontalSection'
import { VerticalSection } from '@/components/pages-html/BUCodeStudio/Layout/Generic/VerticalSection'
import { HorizontalParent } from '@/components/pages-html/BUCodeStudio/Layout/Generic/HorizontalParent'
import { FileTree } from '@/components/pages-html/BUCodeStudio/Implementation/FileTree/FileTree'
import { ModulesList } from '@/components/pages-html/BUCodeStudio/Implementation/ModulesList/ModulesList'
import { ColumnFiles } from '@/components/pages-html/BUCodeStudio/Implementation/ColumnFiles/ColumnFiles'
import { CodeEdtior } from '../Implementation/CodeEditor/CodeEditor'
import { RunWindow } from '../Implementation/RunWindow/RunWindow'
import { AllFiles } from '../Implementation/AllFiles/AllFiles'

export function TabCoding() {
  return (
    <>
      {/*  */}
      <HorizontalParent>
        <HorizontalSection border width={'calc(225px + 225px)'}>
          <VerticalSection border height='calc(100% - 225px)'>
            <HorizontalParent>
              <HorizontalSection border width={'calc(225px)'}>
                <FileTree></FileTree>
              </HorizontalSection>
              <HorizontalSection width={'calc(225px'}>
                <VerticalSection border height='calc(100% - 300px)'>
                  <ModulesList></ModulesList>
                </VerticalSection>
                <VerticalSection height='calc(300px)'>
                  <AllFiles height='300px'></AllFiles>
                </VerticalSection>
              </HorizontalSection>
            </HorizontalParent>
          </VerticalSection>
          <VerticalSection height='calc(225px)'>
            <ColumnFiles height='calc(225px)'></ColumnFiles>
          </VerticalSection>
        </HorizontalSection>
        <HorizontalSection
          border
          width={'calc((100% - 225px - 225px) * 50 / 100)'}
        >
          <VerticalSection border height='calc(100% - 225px)'>
            <CodeEdtior></CodeEdtior>
          </VerticalSection>
          <VerticalSection height='calc(225px)'>Value Slider</VerticalSection>
        </HorizontalSection>
        <HorizontalSection
          border
          width={'calc((100% - 225px - 225px) * 50 / 100)'}
        >
          <RunWindow></RunWindow>
        </HorizontalSection>
      </HorizontalParent>
      {/*  */}
    </>
  )
}
