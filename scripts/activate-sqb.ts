import { activateAction } from "@/lib/pay/business"
import { env } from "@/env"

activateAction("device-001", env.PAY_ACTIVATION_CODE)
