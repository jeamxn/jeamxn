import { type DynamicModule, Global, Module } from "@nestjs/common";
import { AssistantModule } from "#assistant/assistant.module";
import { HealthModule } from "#health/health.module";
import { PortfolioModule } from "#portfolio/portfolio.public";
import { ResumeModule } from "#resume/resume.module";
import { CONFIG, type ServerConfig } from "#shared/config";

@Global()
@Module({})
class ConfigurationModule {
  static register(config: ServerConfig): DynamicModule {
    return {
      module: ConfigurationModule,
      providers: [{ provide: CONFIG, useValue: config }],
      exports: [CONFIG],
    };
  }
}
@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: Nest dynamic modules are class tokens.
export class AppModule {
  static register(config: ServerConfig): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigurationModule.register(config),
        HealthModule,
        PortfolioModule,
        AssistantModule,
        ResumeModule,
      ],
    };
  }
}
