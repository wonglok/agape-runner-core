import { ProjectEditor } from '@/components/projects/ProjectEditor/ProjectEditor'
import { ProjectLoaderGuard } from '@/components/projects/ProjectLoaderGuard/ProjectLoaderGuard'

export default function ProjectDetail() {
  return (
    <ProjectLoaderGuard>
      <ProjectEditor></ProjectEditor>
    </ProjectLoaderGuard>
  )
}

//

//

//
