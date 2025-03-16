import { z } from "zod";

export const TOOL_NAME = "chainOfDraft";

// Detailed parameter descriptions
export const TOOL_PARAM_DESCRIPTIONS = {
    reasoning_chain: "Array of strings representing the current chain of reasoning steps. Each step should be a clear, complete thought that contributes to the overall analysis or solution.",

    next_step_needed: "Boolean flag indicating whether another critique or revision cycle is needed in the reasoning chain. Set to false only when the final, satisfactory conclusion has been reached.",

    draft_number: "Current draft number in the iteration sequence (must be >= 1). Increments with each critique or revision.",

    total_drafts: "Estimated total number of drafts needed to reach a complete solution (must be >= draft_number). Can be adjusted as the solution evolves.",

    is_critique: "Boolean flag indicating whether the current step is a critique phase (true) evaluating previous reasoning, or a revision phase (false) implementing improvements.",

    critique_focus: "The specific aspect or dimension being critiqued in the current evaluation (e.g., 'logical_consistency', 'factual_accuracy', 'completeness', 'clarity', 'relevance'). Required when is_critique is true.",

    revision_instructions: "Detailed, actionable guidance for how to revise the reasoning based on the preceding critique. Should directly address issues identified in the critique. Required when is_critique is false.",

    step_to_review: "Zero-based index of the specific reasoning step being targeted for critique or revision. When omitted, the critique or revision applies to the entire chain.",

    is_final_draft: "Boolean flag indicating whether this is the final draft in the reasoning process. Helps signal the completion of the iterative refinement.",
};

export const TOOL_SCHEMA = {
    reasoning_chain: z.array(z.string().min(1, "Reasoning steps cannot be empty"))
        .min(1, "At least one reasoning step is required")
        .describe(TOOL_PARAM_DESCRIPTIONS.reasoning_chain),

    next_step_needed: z.boolean()
        .describe(TOOL_PARAM_DESCRIPTIONS.next_step_needed),

    draft_number: z.number()
        .min(1, "Draft number must be at least 1")
        .describe(TOOL_PARAM_DESCRIPTIONS.draft_number),

    total_drafts: z.number()
        .min(1, "Total drafts must be at least 1")
        .describe(TOOL_PARAM_DESCRIPTIONS.total_drafts),

    is_critique: z.boolean()
        .optional()
        .describe(TOOL_PARAM_DESCRIPTIONS.is_critique),

    critique_focus: z.string()
        .min(1, "Critique focus cannot be empty")
        .optional()
        .describe(TOOL_PARAM_DESCRIPTIONS.critique_focus),

    revision_instructions: z.string()
        .min(1, "Revision instructions cannot be empty")
        .optional()
        .describe(TOOL_PARAM_DESCRIPTIONS.revision_instructions),

    step_to_review: z.number()
        .min(0, "Step index must be non-negative")
        .optional()
        .describe(TOOL_PARAM_DESCRIPTIONS.step_to_review),

    is_final_draft: z.boolean()
        .optional()
        .describe(TOOL_PARAM_DESCRIPTIONS.is_final_draft),

    new_reasoning_steps: z.array(z.string().min(1, "Reasoning steps cannot be empty"))
        .min(1, "At least one new reasoning step is required")
        .describe("New reasoning steps to add to the chain"),
};

// Add this right after TOOL_NAME
export const TOOL_REQUIRED_PARAMS_NOTICE = `
⚠️ REQUIRED PARAMETERS - ALL MUST BE PROVIDED:
1. reasoning_chain: string[] - At least one reasoning step
2. next_step_needed: boolean - Whether another iteration is needed
3. draft_number: number - Current draft number (≥ 1)
4. total_drafts: number - Total planned drafts (≥ draft_number)

Optional parameters only required based on context:
- is_critique?: boolean - If true, critique_focus is required
- critique_focus?: string - Required when is_critique=true
- revision_instructions?: string - Recommended for revision steps
- step_to_review?: number - Specific step index to review
- is_final_draft?: boolean - Marks final iteration
`;

export const TOOL_DESCRIPTION = `
    # Chain of Draft (CoD): Systematic Reasoning Tool

    ${TOOL_REQUIRED_PARAMS_NOTICE}

    ## Purpose:
    Enhances problem-solving through structured, iterative critique and revision.

    Chain of Draft is an advanced reasoning tool that enhances problem-solving through structured, iterative critique and revision. Unlike traditional reasoning approaches, CoD mimics the human drafting process to improve clarity, accuracy, and robustness of conclusions.

    ## When to Use This Tool:
    - **Complex Problem-Solving:** Tasks requiring detailed, multi-step analysis with high accuracy demands
    - **Critical Reasoning:** Problems where logical flow and consistency are essential
    - **Error-Prone Scenarios:** Questions where initial reasoning might contain mistakes or oversight
    - **Multi-Perspective Analysis:** Cases benefiting from examining a problem from different angles
    - **Self-Correction Needs:** When validation and refinement of initial thoughts are crucial
    - **Detailed Solutions:** Tasks requiring comprehensive explanations with supporting evidence
    - **Mathematical or Logical Puzzles:** Problems with potential for calculation errors or logical gaps
    - **Nuanced Analysis:** Situations with subtle distinctions that might be missed in a single pass

    ## Key Capabilities:
    - **Iterative Improvement:** Systematically refines reasoning through multiple drafts
    - **Self-Critique:** Critically examines previous reasoning to identify flaws and opportunities
    - **Focused Revision:** Targets specific aspects of reasoning in each iteration
    - **Perspective Flexibility:** Can adopt different analytical viewpoints during critique
    - **Progressive Refinement:** Builds toward optimal solutions through controlled iterations
    - **Context Preservation:** Maintains understanding across multiple drafts and revisions
    - **Adaptable Depth:** Adjusts the number of iterations based on problem complexity
    - **Targeted Improvements:** Addresses specific weaknesses in each revision cycle

    ## Parameters Explained:
    - **reasoning_chain:** Array of strings representing your current reasoning steps. Each element should contain a clear, complete thought that contributes to the overall analysis.
    
    - **next_step_needed:** Boolean flag indicating whether additional critique or revision is required. Set to true until the final, refined reasoning chain is complete.
    
    - **draft_number:** Integer tracking the current iteration (starting from 1). Increments with each critique or revision.
    
    - **total_drafts:** Estimated number of drafts needed for completion. This can be adjusted as the solution evolves.
    
    - **is_critique:** Boolean indicating the current mode:
      * true = Evaluating previous reasoning
      * false = Implementing revisions
    
    - **critique_focus:** (Required when is_critique=true) Specific aspect being evaluated, such as:
      * "logical_consistency": Checking for contradictions or flaws in reasoning
      * "factual_accuracy": Verifying correctness of facts and calculations
      * "completeness": Ensuring all relevant aspects are considered
      * "clarity": Evaluating how understandable the reasoning is
      * "relevance": Assessing if reasoning directly addresses the problem
    
    - **revision_instructions:** (Required when is_critique=false) Detailed guidance for improving the reasoning based on the preceding critique.
    
    - **step_to_review:** (Optional) Zero-based index of the specific reasoning step being critiqued or revised. When omitted, applies to the entire chain.
    
    - **is_final_draft:** (Optional) Boolean indicating whether this is the final iteration of reasoning.

    ## Error Handling and Recovery:
    1. **Common Error Scenarios:**
       - **Stalled Progress:** When multiple iterations show no improvement
         * Solution: Change critique_focus or reduce scope
         * Prevention: Use specific, actionable revision_instructions
       
       - **Circular Reasoning:** Same points repeated in different words
         * Solution: Use step_to_review to focus on problematic steps
         * Prevention: Track key points across iterations
       
       - **Scope Creep:** Reasoning chain grows but loses focus
         * Solution: Refocus using relevance critique
         * Prevention: Regular relevance checks
       
       - **Parameter Validation Failures:**
         * Solution: Check parameter requirements and dependencies
         * Prevention: Follow parameter guidelines strictly

    ## Performance Optimization:
    1. **Token Usage Guidelines:**
       - Keep reasoning steps concise but complete
       - Focus critiques on specific aspects
       - Use step_to_review to limit scope
       - Typical effective range: 3-5 total_drafts
       - Consider diminishing returns after 5-7 iterations

    2. **Success Criteria:**
       - Clear improvement in reasoning quality
       - Direct addressing of the problem
       - Logical consistency throughout
       - Appropriate level of detail
       - No remaining contradictions

    ## Integration Examples:
    1. **Problem Analysis:**
    \`\`\`json
    {
        "reasoning_chain": ["Initial analysis of the problem..."],
        "draft_number": 1,
        "total_drafts": 3,
        "next_step_needed": true,
        "is_critique": false
    }
    \`\`\`

    2. **Logical Evaluation:**
    \`\`\`json
    {
        "reasoning_chain": ["Previous reasoning..."],
        "draft_number": 2,
        "total_drafts": 3,
        "next_step_needed": true,
        "is_critique": true,
        "critique_focus": "logical_consistency"
    }
    \`\`\`

    3. **Final Refinement:**
    \`\`\`json
    {
        "reasoning_chain": ["Refined reasoning..."],
        "draft_number": 3,
        "total_drafts": 3,
        "next_step_needed": false,
        "is_critique": false,
        "is_final_draft": true,
        "revision_instructions": "Polish and finalize"
    }
    \`\`\`

    ## Best Practice Workflow:
    1. **Start with Initial Draft:** Begin with your first-pass reasoning and set a reasonable total_drafts (typically 3-5).
    
    2. **Alternate Critique and Revision:** Use is_critique=true to evaluate reasoning, then is_critique=false to implement improvements.
    
    3. **Focus Each Critique:** Choose a specific critique_focus for each evaluation cycle rather than attempting to address everything at once.
    
    4. **Provide Detailed Revision Guidance:** Include specific, actionable revision_instructions based on each critique.
    
    5. **Target Specific Steps When Needed:** Use step_to_review to focus on particular reasoning steps that need improvement.
    
    6. **Adjust Total Drafts As Needed:** Modify total_drafts based on problem complexity and progress.
    
    7. **Mark Completion Appropriately:** Set next_step_needed=false only when the reasoning chain is complete and satisfactory.
    
    8. **Aim for Progressive Improvement:** Each iteration should measurably improve the reasoning quality.

    Chain of Draft is particularly effective when complex reasoning must be broken down into clear steps, analyzed from multiple perspectives, and refined through systematic critique. By mimicking the human drafting process, it produces more robust and accurate reasoning than single-pass approaches.
`;

