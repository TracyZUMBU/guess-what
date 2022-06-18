import { ComponentStory, ComponentMeta } from "@storybook/react"
import { Heading } from "./title"

export default {
  title: "Example/Title",
  component: Heading,
  argTypes: {
    color: { control: "color" }
  }
} as ComponentMeta<typeof Heading>

const Template: ComponentStory<typeof Heading> = args => <Heading {...args} />
