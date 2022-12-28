import slugify from 'slugify'

export const getSlug = (v) => slugify(`${v}`, '_')
