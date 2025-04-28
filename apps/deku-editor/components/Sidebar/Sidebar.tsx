'use client'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion'

export default function Sidebar() {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 overflow-y-auto">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="sections">
          <AccordionTrigger className="px-4 py-2 font-semibold">Sections</AccordionTrigger>
          <AccordionContent className="px-4 py-2">Header Blocks, Hero Layouts...</AccordionContent>
        </AccordionItem>

        <AccordionItem value="elements">
          <AccordionTrigger className="px-4 py-2 font-semibold">Elements</AccordionTrigger>
          <AccordionContent className="px-4 py-2">Text, Images, Buttons...</AccordionContent>
        </AccordionItem>

        <AccordionItem value="media">
          <AccordionTrigger className="px-4 py-2 font-semibold">Media</AccordionTrigger>
          <AccordionContent className="px-4 py-2">Uploaded images, Videos...</AccordionContent>
        </AccordionItem>

        <AccordionItem value="templates">
          <AccordionTrigger className="px-4 py-2 font-semibold">Templates</AccordionTrigger>
          <AccordionContent className="px-4 py-2">Full page templates...</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
