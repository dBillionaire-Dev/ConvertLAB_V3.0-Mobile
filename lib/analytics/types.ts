export interface CalculationEvent {
  id: string
  anonymousId: string
  calculatorId: string
  calculatorName: string
  category: string
  occurredAt: string
  appVersion: string
  wasOffline: boolean
  source: "android"
  environment: string
}
