/**
 * AquaVenture - Payload CMS Types
 * Type definitions for Payload CMS configuration
 */

// ============================================
// FIELD TYPES
// ============================================

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'checkbox'
  | 'select'
  | 'date'
  | 'upload'
  | 'relationship'
  | 'group'
  | 'array'
  | 'json'
  | 'richText'

export interface SelectOption {
  label: string
  value: string
}

export interface FieldAdmin {
  position?: 'sidebar'
  description?: string
  placeholder?: string
  readOnly?: boolean
  hidden?: boolean
  thumbnail?: boolean
  rows?: number
  step?: number
  minDate?: Date
  date?: {
    minDate?: Date
    maxDate?: Date
  }
  group?: string
  elements?: string[]
  leaves?: string[]
  defaultColumns?: string[]
}

export interface Field {
  name: string
  type: FieldType
  required?: boolean
  unique?: boolean
  localized?: boolean
  defaultValue?: any
  min?: number
  max?: number
  options?: SelectOption[]
  hasMany?: boolean
  relationTo?: string
  fields?: Field[]
  admin?: FieldAdmin
  access?: FieldAccess
  hooks?: FieldHooks
}

export interface FieldAccess {
  read?: AccessFunction
  create?: AccessFunction
  update?: AccessFunction
}

export interface FieldHooks {
  beforeValidate?: HookFunction[]
  beforeChange?: HookFunction[]
  afterChange?: HookFunction[]
}

export type HookFunction = (args: {
  value?: any
  data?: any
  req?: any
  operation?: string
}) => any

// ============================================
// COLLECTION TYPES
// ============================================

export interface CollectionAdmin {
  useAsTitle?: string
  group?: string
  description?: string
  defaultColumns?: string[]
  listSearchableFields?: string[]
  preview?: (doc: any) => string
}

export interface CollectionAuth {
  verifyEmail?: boolean
  maxLoginAttempts?: number
  lockTime?: number
  tokenExpiration?: number
  passwordReset?: boolean
}

export interface CollectionUpload {
  staticURL?: string
  staticDir?: string
  imageSizes?: Array<{
    name: string
    width: number
    height: number
  }>
  adminThumbnail?: string
  mimeTypes?: string[]
}

export interface CollectionAccess {
  read?: AccessFunction
  create?: AccessFunction
  update?: AccessFunction
  delete?: AccessFunction
}

export type AccessFunction = (args: {
  req?: any
  id?: string
}) => any | boolean

export interface CollectionConfig {
  slug: string
  admin?: CollectionAdmin
  auth?: CollectionAuth
  upload?: CollectionUpload
  access?: CollectionAccess
  fields: Field[]
}

// ============================================
// GLOBAL TYPES
// ============================================

export interface GlobalConfig {
  slug: string
  admin?: {
    group?: string
    description?: string
  }
  access?: {
    read?: AccessFunction
    update?: AccessFunction
  }
  fields: Field[]
}

// ============================================
// ACCESS CONTROL
// ============================================

export interface AccessControl {
  [key: string]: {
    read: AccessFunction
    create: AccessFunction
    update: AccessFunction
    delete: AccessFunction
  }
}

// ============================================
// PAYLOAD CONFIG
// ============================================

export interface PayloadConfig {
  serverURL?: string
  collections: CollectionConfig[]
  globals: GlobalConfig[]
  localization?: {
    locales: string[]
    defaultLocale: string
    fallback?: boolean
  }
  admin?: {
    user?: string
    autoLogin?: {
      email: string
      password: string
    }
    avatar?: string
    meta?: {
      titleSuffix?: string
      favicon?: string
    }
    css?: string
    components?: {
      beforeNavLinks?: Array<{ path: string }>
    }
  }
  rateLimit?: {
    max: number
    window: number
  }
  cors?: string[]
  csrf?: string[]
}

// ============================================
// PAYLOAD CONTEXT
// ============================================

export interface PayloadUser {
  id: string
  email: string
  name?: string
  role: 'USER' | 'EDITOR' | 'ADMIN' | 'SUPER_ADMIN'
  image?: string
  locale?: string
}

export interface PayloadRequest {
  user?: PayloadUser
  payload: any
  locale?: string
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface PaginatedDocs<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export interface Where {
  [key: string]: any
}

export interface QueryOptions {
  where?: Where
  sort?: string
  limit?: number
  page?: number
  depth?: number
  locale?: string
}
