export interface KeySpecifications {
  quantum_bound: string;
  graphics_engine: string;
}

export interface AnatomyPillar {
  type: string;
  model?: string;
  feature: string;
  description?: string;
}

export interface Anatomy {
  the_brain: AnatomyPillar;
  the_visuals: AnatomyPillar;
  the_interface: AnatomyPillar;
  the_architecture: AnatomyPillar;
  the_vault: AnatomyPillar;
}

export interface MemoryFootprint {
  total: string;
  weights: string;
  mapped_embeddings: string;
}

export interface PerformanceStats {
  prefill_tokens_per_sec: number;
  decode_tokens_per_sec: number;
  backend: string;
}

export interface PerformanceAndModelSpecs {
  model: string;
  context_window: string;
  memory_footprint: MemoryFootprint;
  performance: PerformanceStats;
  status: string;
  local_serving: string;
}

export interface EdgeVsCloudMetric {
  metric: string;
  networked_cloud_ai_apis: string;
  ael_qa88_edge_engine: string;
}

export interface VisualPipelineStage {
  stage: number;
  name: string;
  description: string;
}

export interface InterfaceOptics {
  spatial_hash: string;
  pixel_resolution: string;
  camera_focal_length: string;
  controlnet_conditioning_weight: number;
  horizontal_fov: string;
  strength_decay_w_t: string;
}

export interface UiDecouplingLayer {
  name: string;
  type: string;
  description: string;
}

export interface ZeroBlockUiDecoupling {
  top_layer: UiDecouplingLayer;
  middle_layer: UiDecouplingLayer;
  bottom_layer: UiDecouplingLayer;
}

export interface WasmSecurityVaultOutput {
  encryption: string;
  loader: string;
}

export interface WasmSecurityVault {
  architecture: string;
  intrinsics: string;
  size_target: string;
  output: WasmSecurityVaultOutput;
}

export interface QuantumTimeToCrack {
  years: string;
  metric: string;
}

export interface QuantumEnergyMetric {
  joules?: string;
  yield?: string;
  metric: string;
}

export interface QuantumBoundMetrics {
  operations_to_crack: string;
  time_to_crack: QuantumTimeToCrack;
  landauer_energy_limit: QuantumEnergyMetric;
  energy_equivalence: QuantumEnergyMetric;
}

export interface LicensePath {
  name: string;
  license?: string;
  target: string;
}

export interface DeploymentLicensingModel {
  path_a: LicensePath;
  path_b: LicensePath;
}

export interface CustomServices {
  availability: string;
  capabilities: string[];
}

export interface SynapseBlueprint {
  document_title: string;
  version: string;
  subtitle: string;
  key_specifications: KeySpecifications;
  anatomy: Anatomy;
  performance_and_model_specs: PerformanceAndModelSpecs;
  comparison_edge_vs_cloud: EdgeVsCloudMetric[];
  visuals_pipeline: VisualPipelineStage[];
  interface_optics: InterfaceOptics;
  zero_block_ui_decoupling: ZeroBlockUiDecoupling;
  wasm_security_vault: WasmSecurityVault;
  quantum_bound_metrics: QuantumBoundMetrics;
  deployment_licensing_model: DeploymentLicensingModel;
  custom_services: CustomServices;
}
