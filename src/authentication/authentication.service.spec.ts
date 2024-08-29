import { UsersModule } from 'src/users/users.module';
import { AuthenticationService } from './authentication.service';
import { Test } from '@nestjs/testing';

describe('AuthenticationService', () => {
  /*
  테스트 초기화 과정에서 모듈이나 의존성을 주입하거나 설정을 다르게 할 수 있는 유연성을 제공하기 위해 new AuthenticationService()로 생성하지 않는다.
  -> 테스트 환경마다 다른 AuthenticationService 객체를 생성해야 할 수 있음

  마찬가지로 let으로 선언한 이유 또한 테스트 환경에서 변수가 재할당될 가능성이 존재하기 때문
  */
  let authenticationService: AuthenticationService;

  // 매 테스트마다 실행됨. 환경을 초기화 시키는 용도로 쓰게 됨

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [],
    }).compile();
    authenticationService = await module.get<AuthenticationService>(
      AuthenticationService,
    );
  });
});
