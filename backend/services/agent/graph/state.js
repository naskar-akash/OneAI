// Making a custom state which can be accessed by all the agents in the graph. This state can be used to store any data that needs to be shared between agents.

import { Annotation } from "@langchain/langgraph";

export const agentState = Annotation.Root({
    prompt: Annotation(),  // creating 'prompt' key inside state
    aiResponse: Annotation(),  // creating 'aiResponse' key inside state
    agent: Annotation(),
    conversationId: Annotation()
})