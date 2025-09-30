import type { NavigationMenuItem } from '@nuxt/ui'

export const sidebarRoutes: NavigationMenuItem[][] = [
  [
    {
      label: 'Conversation',
      icon: 'lucide:message-square',
      to: '/dashboard/conversation',
    },
    {
      label: 'Code Generation',
      icon: 'lucide:code',
      to: '/dashboard/code',
    },
    {
      label: 'AI Article Writer',
      icon: 'lucide:square-pen',
      to: '/dashboard/write-article',
    },
    {
      label: 'Blog Title Generator',
      icon: 'lucide:hash',
      to: '/dashboard/generate-blog-title',
    },
    {
      label: 'Background Removal',
      icon: 'lucide:eraser',
      to: '/dashboard/remove-background',
    },
    {
      label: 'Resume Reviewer',
      icon: 'lucide:file-check',
      to: '/dashboard/review-resume',
    },
  ],
]

export const aiTools = [
  // conversation
  {
    title: 'Conversation',
    description: 'Engage in natural, intelligent conversation with AI for brainstorming, questions, or casual chat.',
    icon: 'lucide:message-square',
    path: '/dashboard/conversation',
    btnText: 'Start Conversation',
  },
  // code generation
  {
    title: 'Code Generation',
    description: 'Generate clean, efficient, and customizable code snippets for various use cases using AI.',
    icon: 'lucide:code',
    path: '/dashboard/code',
    btnText: 'Generate Code',
  },

  // AI Article Writer
  {
    title: 'AI Article Writer',
    description: 'Craft well-structured and engaging articles on any subject using advanced AI writing assistance.',
    icon: 'lucide:square-pen',
    path: '/dashboard/write-article',
    btnText: 'Write Article',
  },
  // Blog Title Generator
  {
    title: 'Blog Title Generator',
    description: 'Discover compelling and attention-grabbing blog titles instantly with AI-powered suggestions.',
    icon: 'lucide:hash',
    path: '/dashboard/generate-blog-title',
    btnText: 'Generate Title',
  },
  // Background Removal
  {
    title: 'Background Removal',
    description: 'Remove image backgrounds instantly and cleanly with our precise AI object remover.',
    icon: 'lucide:eraser',
    path: '/dashboard/remove-background',
    btnText: 'Remove Background',
  },

  {
    title: 'Resume Reviewer',
    description: 'Enhance your resume with AI-powered insights to boost your chances of getting hired.',
    icon: 'lucide:file-check',
    path: '/dashboard/review-resume',
    btnText: 'Review Resume',
  },
]
