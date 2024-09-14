interface Message {
    id: string;
    object: string;
    created_at: number;
    assistant_id: string | null;
    thread_id: string;
    run_id: string | null;
    role: "assistant" | "user";
    content: Content[];
    attachments: any[];
    metadata: Record<string, any>;
  }
  
  interface Content {
    type: string;
    text: TextContent;
  }
  
  interface TextContent {
    value: string;
    annotations: any[];
  }