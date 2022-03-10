import { NgModule } from '@angular/core';

// Modules
import { PostsModule } from './posts/posts.module';

@NgModule({
  imports: [PostsModule],
  exports: [PostsModule],
  declarations: [],
  providers: [],
})
export class FeaturesModule {}
