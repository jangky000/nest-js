nest new .
nest g module boards
nest g controller boards --no-spec
nest g service boards --no-spec

서비스
- 컨트롤러에서 데이터 유효성 체크
- 데이터베이스 CRUD
- @Injectable 데코레이터 -> 모듈에 제공
- 이 서비스 인스턴스는 애플리케이션 전체에서 사용될 수 있다.

프로바이더
- nest의 기본 개념
- 대부분의 기본 Nest 클래스는 서비스, 리포지토리, 팩토리, 헬퍼 등 프로바이더
- 프로바이더의 주요 아이디어는 종속성으로 주입할 수 있다는 점(객체는 서로 다양한 관계를 만들 수 있다. + 객체 인스턴스를 연결하는 기능은 대부분 Nest 런타임 시스템에 위임)

클라이언트에서 요청을 보내면
- 컨트롤러로 이동
- 컨트롤러에서 알맞은 요청 경로에 라우팅
- 라우팅의 해당 핸들러로 이동
- 요청 처리를 위해 서비스로 들어가서 로직을 처리한 후 컨트롤러에 리턴값을 보내줌
- 그 후 클라이언트로 결과 값을 보내줌

DTO(data transfer object)
- 계층 간 데이터 교환을 위한 객체
- DB에서 데이터를 얻어 Service나 Controller 등으로 보낼 때 사용하는 객체
- DTO는 데이터가 네트워크를 통해 전송되는 방법을 정의하는 객체
- interface나 class를 이용해서 정의될 수 있으나 클래스를 사용하는 것을 추천
- 클래스는 인터페이스와 다르게 런타임에서 작동하기 때문에 파이프 같은 기능을 이용할 때 더 용이하다. 그래서 클래스를 사용해서 DTO를 작성함

DTO 왜 쓰나요?
- 데이터 유효성 체크하는데 효율적
- 더 안정적인 코드로 만들어준다.
- 여러 곳에서 사용했을 때 유지 보수성이 높아진다.


Pipe
- @Injectable() 데코레이터로 주석이 달린 클래스
- 파이프는 data transformation과 data validation을 위해 사용
- 파이프는 컨트롤러 경로 처리기에 의해 처리되는 인수에 대해 작동
- nest는 메소드(ex. @get handler)가 호출되기 직전에 파이프를 삽입하고 파이프는 메소드로 향하는 인수를 수신하고 이에 대해 작동

Handler-level Pipes

- 핸들러 전체에 적용

````typescript
@Post()
@UsePipes(pipe)
createBoard(
    @Body('title') title,
    @Body('description') description
){

}
````

Parameter-level Pipes

- 특정 파라미터에게만 적용되는 파이프


````typescript
@Post()
createBoard(
    @Body('title', ParameterPipe) title,
    @Body('description') description
){

}
````

Global Pipes
- 애플리케이션 레벨의 파이프
- 클라이언트에서 들어오는 모든 요청에 적용됨.
- 가장 상단 영역인 main.ts에 넣어주면 됨.

````typescript
async function bootstrap(){
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(GlobalPipes);
    await app.listen(3000);
}
bootStrap();
````

Built-in Pipes

- Nest JS에 기본적으로 사용할 수 있게 만들어 놓은 6가지의 파이프가 있습니다.
- ValidationPipe
- ParseIntPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- DefaultValuePipe

````typescript
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number){
    return ;
}
````

필요한 모듈
- class-validator, class-transformer
- yarn add class-validator class-transformer

class-validator
- https://github.com/typestack/class-validator

커스텀 파이프

- PipeTransform이라는 인터페이스를 implements한다.
- transform이라는 메소드를 반드시 구현한다.

````typescript
export class BoardStatusValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata){
        console.log('value', value);
        console.log('metadata', metadata);
        return value;
    }
}
````

transform() 메소드
- value: 처리된 인자의 값, ex. "asdasda"
- metadata: 인자에 대한 메타데이터를 포함한 객체, ex. {metatype: [Function: String], type: 'body', data: 'status'}
- transform에서 return 된 값은 route 핸들러로 전달됨
- 만약 예외(Exception)가 발생 시 클라이언트에 바로 전해짐