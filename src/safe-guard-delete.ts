import * as prompts from "prompts";

export async function safeGuardDelete() {
// Anything but dev or test
    // Activate safe guard
    const {confirm = false} = await prompts({
        type: 'confirm',
        name: 'confirm',
        message: `SAFE GUARD! are you sure you'd like to ACTUALLY delete files?! [PRODUCTION MODE]`,
        initial: false
    });
    return confirm;
}
