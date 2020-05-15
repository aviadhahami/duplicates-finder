import * as prompts from "prompts";

export async function safeGuardDelete() {
// Anything but dev or test
    const shouldDelete = !['development', 'test'].includes(process.env.NODE_ENV);
    let actuallyDelete = false;
    if (shouldDelete) {
        // Activate safe guard
        const {confirm = false} = await prompts({
            type: 'confirm',
            name: 'confirm',
            message: `SAFE GUARD! are you sure you'd like to ACTUALLY delete files?! [PRODUCTION MODE]`,
            initial: false
        });
        if (confirm) {
            actuallyDelete = true;
        }
    }
    return actuallyDelete;
}
