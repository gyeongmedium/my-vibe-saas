## ADDED Requirements

### Requirement: 항목 목록을 localStorage에 저장
시스템은 항목 목록이 변경될 때마다 `study-planner-items` 키에 JSON 직렬화하여 localStorage에 SHALL 저장해야 한다.

#### Scenario: 항목 추가 후 새로고침해도 유지
- **WHEN** 사용자가 항목을 추가한 후 페이지를 새로고침
- **THEN** 추가한 항목이 목록에 그대로 표시됨

#### Scenario: 완료 상태 토글 후 새로고침해도 유지
- **WHEN** 사용자가 항목을 완료 처리한 후 페이지를 새로고침
- **THEN** 해당 항목이 완료 상태로 표시됨

### Requirement: localStorage 파싱 실패 시 안전하게 복구
시스템은 localStorage 데이터가 없거나 파싱에 실패하면 빈 배열을 반환하고 SHALL 앱 크래시 없이 정상 동작해야 한다.

#### Scenario: 손상된 데이터 복구
- **WHEN** localStorage에 유효하지 않은 JSON이 저장되어 있을 때 앱 로드
- **THEN** 빈 목록으로 시작하고 에러 없이 정상 표시
